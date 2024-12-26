import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { debounceTime, filter, map, skipWhile, startWith, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import {
  clearItems,
  loadPageResults,
  loadSearchResults,
} from '../../store/search.actions';
import {
  selectIsAllItemsLoaded,
  selectIsLoading,
  selectPastQueries,
  selectSearchResults,
} from '../../store/search.selectors';
import {
  IBookData,
  MIN_QUERY_LENGTH,
  RESULTS_LIMIT,
} from '../../models/search.models';
import { Observable, Subject, Subscription, timer } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { PopupDialogComponent } from '../popup-dialog/popup-dialog.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit, OnDestroy {
  public searchControl = new FormControl('', [
    Validators.minLength(MIN_QUERY_LENGTH),
  ]);

  private subscriptions = new Subscription();
  private scrollSubject$ = new Subject<void>();
  public page: number = 0;
  public currentQuery: string = '';
  public suggestions: Set<string> = new Set();
  public pastQueries: string[] = [];
  public error = '';
  // This flag is needed cause totalItems on used API worked incorrectly
  public allItemsLoaded: boolean = false;
  public isLoading: boolean = false;
  public results$ = new Observable<IBookData[]>();

  public results: IBookData[] = []

  constructor(private store: Store<any>, public dialog: MatDialog) {}

  public ngOnInit(): void {
    this.results$ = this.store.select(selectSearchResults);

    this.subscriptions.add(
      this.store.select(selectPastQueries).subscribe((pastQueries) => {
        this.pastQueries = pastQueries;
        this.suggestions.clear();
      })
    );

    this.store.select(selectIsLoading).subscribe((isLoading) => {
      this.isLoading = isLoading as boolean
    })

    this.store.select(selectIsAllItemsLoaded).subscribe((isAllItemsLoaded) => {
      this.allItemsLoaded = isAllItemsLoaded as boolean
    })

    this.subscriptions.add(
      this.scrollSubject$.pipe(debounceTime(200)).subscribe(() => {
        this.loadMoreItems();
      })
    );

    this.subscriptions.add(
      this.searchControl.valueChanges
        .pipe(
          filter((value): value is string => value !== null),
          map((value: string) => value.trim().toLowerCase()),
          tap((value) => {
            this.suggestions.clear();
            value.split(' ').forEach((queryPart) => {
              this.pastQueries
                .filter((query) => query.includes(queryPart))
                .forEach((filteredQuery) =>
                  this.suggestions.add(filteredQuery)
                );
            });

            this.store.dispatch(clearItems());
          }),
          debounceTime(1000),
          filter((value: string) => value.length >= MIN_QUERY_LENGTH)
        )
        .subscribe((query) => {
          this.page = 0;
          this.allItemsLoaded = false;

          this.store.dispatch(
            loadSearchResults({ query, limit: RESULTS_LIMIT, page: this.page })
          );
        })
    );
  }
  
  public openDialog(data: IBookData): void {
    this.dialog.open(PopupDialogComponent, {
      width: '700px',
      data,
    });
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public clearScreen(): void {
    this.page = 0;
    this.searchControl.setValue('');
    this.searchControl.markAsUntouched();
    this.store.dispatch(clearItems());
  }

  public onListScroll(event: Event): void {
    const viewport = event.target as HTMLElement;
    const threshold = 300;

    if (
      viewport.scrollTop + viewport.clientHeight <=
        viewport.scrollHeight + threshold &&
      !this.allItemsLoaded
    ) {
      this.scrollSubject$.next();
    }
  }

  public loadMoreItems(): void {
    if (this.allItemsLoaded) return;

    this.page++;
    const query = this.searchControl.value;

    if (query?.length) {
      this.store.dispatch(
        loadPageResults({ query, limit: RESULTS_LIMIT, page: this.page })
      );
    }
  }
}

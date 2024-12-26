import { Injectable, inject } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, concatMap, debounceTime, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { SearchService } from '../services/search.service';
import {
  loadPageResults,
  loadPageResultsError,
  loadPageResultsSuccess,
  loadSearchResults,
  loadSearchResultsError,
  loadSearchResultsSuccess,
} from './search.actions';
import { IBookDataResponse } from '../models/search.models';

@Injectable()
export class SearchEffects {
  private actions$ = inject(Actions);
  private searchService = inject(SearchService);

  loadSearchResults$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadSearchResults),
      switchMap((action) =>
        this.searchService.search(action.query, action.page, action.limit).pipe(
          map((response: IBookDataResponse) =>
            loadSearchResultsSuccess({
              results: response.items || [],
              query: action.query,
            })
          ),
          catchError((error) => of(loadSearchResultsError({ error })))
        )
      )
    )
  );

  loadPageResults$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPageResults),
      debounceTime(500),
      concatMap((action) =>
        this.searchService.search(action.query, action.page, action.limit).pipe(
          map((response: IBookDataResponse) =>
            loadPageResultsSuccess({
              results: response.items || [],
              query: action.query,
            })
          ),
          catchError((error) => of(loadPageResultsError({ error })))
        )
      )
    )
  );
}

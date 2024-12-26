import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ISearchState } from '../models/search.models';

export const selectState = createFeatureSelector<ISearchState>('results');
export const selectSearchState = (state: { search: ISearchState }) =>
  state.search;

export const selectPastQueries = createSelector(
  selectSearchState,
  (state: ISearchState) => state.pastQueries
);

export const selectIsAllItemsLoaded = createSelector(
  selectSearchState,
  (state: ISearchState) => state.allItemsLoaded
);

export const selectIsLoading = createSelector(
  selectSearchState,
  (state: ISearchState) => state.isLoading
);


export const selectSearchResults = createSelector(
  selectSearchState,
  (state: ISearchState) => state.results
);

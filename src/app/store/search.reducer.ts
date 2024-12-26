import { createReducer, on } from '@ngrx/store';
import {
  clearItems,
  loadPageResults,
  loadPageResultsError,
  loadPageResultsSuccess,
  loadSearchResults,
  loadSearchResultsError,
  loadSearchResultsSuccess,
} from './search.actions';
import { ISearchState } from '../models/search.models';

export const initialState: ISearchState = {
  pastQueries: [],
  results: [],
  allItemsLoaded: false,
  isLoading: false,
};

export const searchReducer = createReducer(
  initialState,
  on(loadSearchResults, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(loadSearchResultsSuccess, (state, { results, query }) => ({
    ...state,
    isLoading: false,
    results: [...state.results, ...results],
    pastQueries: results?.length
      ? [...new Set([...state.pastQueries, query])]
      : state.pastQueries,
  })),
  on(loadSearchResultsError, (state, { error }) => ({
    ...state,
    error,
  })),
  on(loadPageResults, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(loadPageResultsSuccess, (state, { results }) => ({
    ...state,
    isLoading: false,
    allItemsLoaded: !results.length,
    results: results?.length ? [...state.results, ...results] : state.results,
  })),
  on(loadPageResultsError, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  on(clearItems, (state) => ({
    ...state,
    isLoading: false,
    results: [],
  }))
);

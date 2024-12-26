import { createAction, props } from '@ngrx/store';
import { IBookData } from '../models/search.models';

export const loadSearchResults = createAction(
  '[Search] Load Search Results',
  props<{ query: string, page: number, limit: number; }>()
);

export const loadSearchResultsSuccess = createAction(
  '[Search] Load Search Results Success',
  props<{ results: IBookData[]; query: string; }>()
);

export const loadSearchResultsError = createAction(
  '[Search] Load Search Results Success',
  props<{ error: string }>()
);

export const loadPageResults = createAction(
  '[Search] Load Page Results',
  props<{ query: string, page: number, limit: number }>()
);

export const loadPageResultsSuccess = createAction(
  '[Search] Load Page Results Success',
  props<{ results: IBookData[]; query: string; }>()
);

export const loadPageResultsError = createAction(
  '[Search] Load Page Results Success',
  props<{ error: string }>()
);

export const clearItems = createAction(
  '[Search] clear items array',
);

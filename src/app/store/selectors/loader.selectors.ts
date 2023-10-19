import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromLoaderReducer from '../reducers/loader.reducer';

export const selectLoaderState =
  createFeatureSelector<fromLoaderReducer.State>('loader');

export const selectSidebarState =
  createFeatureSelector<fromLoaderReducer.State>('sidebar');

export const selectIsLoadingState = createSelector(
  selectLoaderState,
  fromLoaderReducer.selectIsLoadingState
);

export const selectIsOpenSidebar = createSelector(
  selectSidebarState,
  fromLoaderReducer.selectIsOpenSidebarState
);

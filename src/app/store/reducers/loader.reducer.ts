import { createReducer, on } from '@ngrx/store';

import * as LoaderActions from '../actions/loader.actions';
import { Trend } from '../../trends/models/trend.model';

export interface State {
  isLoading: boolean;
  isOpenSidebar: boolean;
}

export const initialState: State = {
  isLoading: false,
  isOpenSidebar: false,
};

export const reducer = createReducer(
  initialState,
  on(
    LoaderActions.updateLoaderState,
    (state, { isLoading }): State => ({ ...state, isLoading })
  ),
  on(
    LoaderActions.updateSidebarState,
    (state, { isOpenSidebar }): State => ({ ...state, isOpenSidebar })
  )
);

export const selectIsLoadingState = (state: State) => state.isLoading;
export const selectIsOpenSidebarState = (state: State) => state.isOpenSidebar;

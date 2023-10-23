import { createReducer, on } from '@ngrx/store';

import * as LoaderActions from '../actions/loader.actions';

export interface State {
  isLoading: boolean;
  isOpenSidebar: boolean;
  isOpenModal: boolean;
}

export const initialState: State = {
  isLoading: false,
  isOpenSidebar: false,
  isOpenModal: false,
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
  ),
  on(
    LoaderActions.updateModalState,
    (state, { isOpenModal }): State => ({ ...state, isOpenModal })
  )
);

export const selectIsLoadingState = (state: State) => state.isLoading;
export const selectIsOpenSidebarState = (state: State) => state.isOpenSidebar;

export const selectIsOpenModalState = (state: State) => state.isOpenModal;

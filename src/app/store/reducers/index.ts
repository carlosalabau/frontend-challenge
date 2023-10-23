import { ActionReducerMap } from '@ngrx/store';
import { routerReducer, RouterState } from '@ngrx/router-store';

import * as fromLoaderReducer from './loader.reducer';

export interface State {
  loader: fromLoaderReducer.State;
  sidebar: fromLoaderReducer.State;
  router: RouterState;
  modal: fromLoaderReducer.State;
}

export const reducers: ActionReducerMap<State> = {
  loader: fromLoaderReducer.reducer,
  sidebar: fromLoaderReducer.reducer,
  modal: fromLoaderReducer.reducer,
  router: routerReducer,
};

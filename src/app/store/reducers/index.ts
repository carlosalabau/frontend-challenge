import { ActionReducerMap } from '@ngrx/store';
import { routerReducer, RouterState } from '@ngrx/router-store';

import * as fromLoaderReducer from './loader.reducer';

export interface State {
  loader: fromLoaderReducer.State;
  sidebar: fromLoaderReducer.State;
  router: RouterState;
}

export const reducers: ActionReducerMap<State> = {
  loader: fromLoaderReducer.reducer,
  sidebar: fromLoaderReducer.reducer,
  router: routerReducer,
};

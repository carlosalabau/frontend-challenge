import { createAction, props } from '@ngrx/store';

export const updateLoaderState = createAction(
  '[Loader] Update loader state',
  props<{ isLoading: boolean }>()
);

export const updateSidebarState = createAction(
  '[Loader] Update sidebar state',
  props<{ isOpenSidebar: boolean }>()
);

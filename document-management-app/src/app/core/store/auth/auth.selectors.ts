import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const selectAuth = (state: AppState) => state.auth;

export const selectCurrentUser = createSelector(
  selectAuth,
  (auth) => auth.user
);

export const selectIsAuthenticated = createSelector(
  selectCurrentUser,
  (user) => !!user
);

export const selectAuthLoading = createSelector(
  selectAuth,
  (auth) => auth.loading
);

export const selectAuthError = createSelector(
  selectAuth,
  (auth) => auth.error
);  
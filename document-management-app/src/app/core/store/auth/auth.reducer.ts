import { createReducer, on } from '@ngrx/store';
import { User } from '../../models/user.model';
import * as AuthActions from './auth.actions';
import { initialAppState } from '../app.state';



export const authReducer = createReducer(
  initialAppState.auth,
  on(AuthActions.login, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(AuthActions.loginSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
    error: null
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    user: null,
    loading: false,
    error
  })),
  on(AuthActions.logout, state => initialAppState.auth),
  on(AuthActions.signup, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(AuthActions.signupSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
    error: null
  })),
  on(AuthActions.signupFailure, (state, { error }) => ({
    ...state,
    user: null,
    loading: false,
    error
  }))
); 
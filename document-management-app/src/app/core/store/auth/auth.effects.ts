import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MockApiService } from '../../services/mock-api.service';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    // private actions$: Actions,
    private mockApiService: MockApiService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  private actions$ = inject(Actions);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(action =>
        this.mockApiService.login(action.username, action.password).pipe(
          map(user => AuthActions.loginSuccess({ user })),
          catchError(error => of(AuthActions.loginFailure({ error: error.message })))
        )
      )
    )
  );

  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signup),
      mergeMap(action =>
        this.mockApiService.signup(action.username, action.email, action.password).pipe(
          map(user => AuthActions.signupSuccess({ user })),
          catchError(error => of(AuthActions.signupFailure({ error: error.message })))
        )
      )
    )
  );

  authSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess, AuthActions.signupSuccess),
      tap(({ user }) => {
        this.snackBar.open(
          `Welcome ${user.username}!`, 
          'Close', 
          { duration: 3000 }
        );
        this.router.navigate(['/dashboard']);
      })
    ),
    { dispatch: false }
  );

  authFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginFailure, AuthActions.signupFailure),
      tap(({ error }) => {
        console.log(error);
        this.snackBar.open(
          error, 
          'Close', 
          { duration: 3000, panelClass: ['error-snackbar'] }
        );
      })
    ),
    { dispatch: false }
  );
} 
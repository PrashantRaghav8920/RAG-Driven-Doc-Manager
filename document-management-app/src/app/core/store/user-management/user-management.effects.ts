import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MockApiService } from '../../services/mock-api.service';
import * as UserManagementActions from './user-management.actions';

@Injectable()
export class UserManagementEffects {
  private actions$ = inject(Actions);
  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserManagementActions.loadUsers),
      mergeMap(({ page, pageSize }) =>
        this.apiService.getUsers(page, pageSize).pipe(
          map(response => UserManagementActions.loadUsersSuccess({
            users: response.users,
            totalUsers: response.total
          })),
          catchError(error => of(UserManagementActions.loadUsersFailure({ 
            error: error.message 
          })))
        )
      )
    );
  });

  addUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserManagementActions.addUser),
      mergeMap(({ user }) =>
        this.apiService.createUser(user).pipe(
          map(newUser => UserManagementActions.addUserSuccess({ user: newUser })),
          catchError(error => of(UserManagementActions.addUserFailure({ 
            error: error.message 
          })))
        )
      )
    );
  });

  updateUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserManagementActions.updateUser),
      mergeMap(({ id, changes }) =>
        this.apiService.updateUser(Number(id), changes).pipe(
          map(updatedUser => UserManagementActions.updateUserSuccess({ 
            user: updatedUser 
          })),
          catchError(error => of(UserManagementActions.updateUserFailure({ 
            error: error.message 
          })))
        )
      )
    );
  });

  deleteUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserManagementActions.deleteUser),
      mergeMap(({ userId }) =>
        this.apiService.deleteUser(userId).pipe(
          map(() => UserManagementActions.deleteUserSuccess({ userId: Number(userId) })),
          catchError(error => of(UserManagementActions.deleteUserFailure({ 
            error: error.message 
          })))
        )
      )
    );
  });

  userSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        UserManagementActions.addUserSuccess,
        UserManagementActions.updateUserSuccess,
        UserManagementActions.deleteUserSuccess
      ),
      tap(action => {
        let message = 'Operation successful';
        if ('user' in action) {
          message = `User ${action.user.username} has been updated`;
        } else if ('userId' in action) {
          message = 'User has been deleted';
        }
        this.snackBar.open(message, 'Close', { duration: 3000 });
      })
    );
  }, { dispatch: false });

  userError$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        UserManagementActions.addUserFailure,
        UserManagementActions.updateUserFailure,
        UserManagementActions.deleteUserFailure,
        UserManagementActions.loadUsersFailure
      ),
      tap(({ error }) => {
        this.snackBar.open(error, 'Close', { 
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      })
    );
  }, { dispatch: false });

  constructor(
    private apiService: MockApiService,
    private snackBar: MatSnackBar
  ) {}
} 
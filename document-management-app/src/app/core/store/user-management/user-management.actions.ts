import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';

// Load Users
export const loadUsers = createAction(
  '[User Management] Load Users',
  props<{ page: number; pageSize: number }>()
);

export const loadUsersSuccess = createAction(
  '[User Management] Load Users Success',
  props<{ users: User[]; totalUsers: number }>()
);

export const loadUsersFailure = createAction(
  '[User Management] Load Users Failure',
  props<{ error: string }>()
);

// Add User
export const addUser = createAction(
  '[User Management] Add User',
  props<{ user: Partial<User> }>()
);

export const addUserSuccess = createAction(
  '[User Management] Add User Success',
  props<{ user: User }>()
);

export const addUserFailure = createAction(
  '[User Management] Add User Failure',
  props<{ error: string }>()
);

// Update User
export const updateUser = createAction(
  '[User Management] Update User',
  props<{ id: number; changes: Partial<User> }>()
);

export const updateUserSuccess = createAction(
  '[User Management] Update User Success',
  props<{ user: User }>()
);

export const updateUserFailure = createAction(
  '[User Management] Update User Failure',
  props<{ error: string }>()
);

// Delete User
export const deleteUser = createAction(
  '[User Management] Delete User',
  props<{ userId: number }>()
);

export const deleteUserSuccess = createAction(
  '[User Management] Delete User Success',
  props<{ userId: number }>()
);

export const deleteUserFailure = createAction(
  '[User Management] Delete User Failure',
  props<{ error: string }>()
); 
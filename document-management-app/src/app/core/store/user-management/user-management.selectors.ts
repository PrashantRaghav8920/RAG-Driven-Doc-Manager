import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserManagementState } from '../app.state';

export const selectUserManagementState = 
  createFeatureSelector<UserManagementState>('userManagement');

export const selectUsers = createSelector(
  selectUserManagementState,
  (state) => state.users
);

export const selectUsersLoading = createSelector(
  selectUserManagementState,
  (state) => state.loading
);

export const selectUsersError = createSelector(
  selectUserManagementState,
  (state) => state.error
);

export const selectTotalUsers = createSelector(
  selectUserManagementState,
  (state) => state.totalUsers
);

export const selectSelectedUser = createSelector(
  selectUserManagementState,
  (state) => state.selectedUser
); 
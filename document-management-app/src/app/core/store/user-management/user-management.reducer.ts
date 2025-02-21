import { createReducer, on } from '@ngrx/store';
import { UserManagementState } from '../app.state';
import * as UserManagementActions from './user-management.actions';

export const initialState: UserManagementState = {
  users: [],
  selectedUser: null,
  loading: false,
  error: null,
  totalUsers: 0
};

export const userManagementReducer = createReducer(
  initialState,
  
  // Load Users
  on(UserManagementActions.loadUsers, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  
  on(UserManagementActions.loadUsersSuccess, (state, { users, totalUsers }) => ({
    ...state,
    users,
    totalUsers,
    loading: false,
    error: null
  })),
  
  on(UserManagementActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Add User
  on(UserManagementActions.addUser, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  
  on(UserManagementActions.addUserSuccess, (state, { user }) => ({
    ...state,
    users: [...state.users, user],
    totalUsers: state.totalUsers + 1,
    loading: false,
    error: null
  })),
  
  on(UserManagementActions.addUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Update User
  on(UserManagementActions.updateUser, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  
  on(UserManagementActions.updateUserSuccess, (state, { user }) => ({
    ...state,
    users: state.users.map(u => u.id === user.id ? user : u),
    loading: false,
    error: null
  })),
  
  on(UserManagementActions.updateUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Delete User
  on(UserManagementActions.deleteUser, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  
  on(UserManagementActions.deleteUserSuccess, (state, { userId }) => ({
    ...state,
    users: state.users.filter(user => user.id !== userId),
    totalUsers: state.totalUsers - 1,
    loading: false,
    error: null
  })),
  
  on(UserManagementActions.deleteUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
); 
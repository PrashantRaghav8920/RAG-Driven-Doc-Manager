import { User } from '../models/user.model';

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface UserManagementState {
  users: User[];
  selectedUser: User | null;
  loading: boolean;
  error: string | null;
  totalUsers: number;
}

export interface AppState {
  auth: AuthState;
  userManagement: UserManagementState;
}

export const initialAppState: AppState = {
  auth: {
    user: null,
    loading: false,
    error: null
  },
  userManagement: {
    users: [],
    selectedUser: null,
    loading: false,
    error: null,
    totalUsers: 0
  }
}; 
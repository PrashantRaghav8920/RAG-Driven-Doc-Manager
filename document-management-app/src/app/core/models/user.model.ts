export interface User {
  id: number;
  username: string;
  role: 'ADMIN' | 'USER';
  password?: string;
  email?: string;
} 
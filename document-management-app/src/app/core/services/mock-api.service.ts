import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class MockApiService {
  private mockUsers: User[] = [
    {
      id: 1,
      username: 'admin',
      password: 'admin123',
      email: 'admin@example.com',
      role: 'ADMIN'
    },
    {
      id: 2,
      username: 'user',
      password: 'user123',
      email: 'user@example.com',
      role: 'USER'
    }
  ];

  // Auth Methods
  login(username: string, password: string): Observable<User> {
    const user = this.mockUsers.find(u => 
      u.username === username && u.password === password
    );
    
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      return of(userWithoutPassword).pipe(delay(1000));
    }
    
    return throwError(() => new Error('Invalid username or password'));
  }

  signup(username: string, email: string, password: string): Observable<User> {
    if (this.mockUsers.some(u => u.username === username)) {
      return throwError(() => new Error('Username already exists'));
    }

    const newUser: User = {
      id: this.mockUsers.length + 1,
      username,
      email,
      password,
      role: 'USER'
    };

    this.mockUsers.push(newUser);
    const { password: _, ...userWithoutPassword } = newUser;
    return of(userWithoutPassword).pipe(delay(1000));
  }

  // User Management Methods
  getUsers(page: number = 0, pageSize: number = 10): Observable<{ users: User[], total: number }> {
    const start = page * pageSize;
    const end = start + pageSize;
    const paginatedUsers = this.mockUsers
      .slice(start, end)
      .map(user => {
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });

    return of({
      users: paginatedUsers,
      total: this.mockUsers.length
    }).pipe(delay(100));
  }

  getUserById(id: number): Observable<User> {
    const user = this.mockUsers.find(u => u.id === id);
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      return of(userWithoutPassword).pipe(delay(500));
    }
    return throwError(() => new Error('User not found'));
  }

  createUser(userData: Partial<User>): Observable<User> {
    if (this.mockUsers.some(u => u.username === userData.username)) {
      return throwError(() => new Error('Username already exists'));
    }

    const newUser: User = {
      id: this.mockUsers.length + 1,
      username: userData.username!,
      email: userData.email!,
      password: userData.password || 'defaultPassword123',
      role: userData.role || 'USER'
    };

    this.mockUsers.push(newUser);
    const { password: _, ...userWithoutPassword } = newUser;
    return of(userWithoutPassword).pipe(delay(1000));
  }

  updateUser(id: number, changes: Partial<User>): Observable<User> {
    const index = this.mockUsers.findIndex(u => u.id === id);
    if (index === -1) {
      return throwError(() => new Error('User not found'));
    }

    // Check if username is being changed and is already taken
    if (changes.username && 
        changes.username !== this.mockUsers[index].username &&
        this.mockUsers.some(u => u.username === changes.username)) {
      return throwError(() => new Error('Username already exists'));
    }

    const updatedUser = {
      ...this.mockUsers[index],
      ...changes,
      id // Ensure ID doesn't change
    };

    this.mockUsers[index] = updatedUser;
    const { password: _, ...userWithoutPassword } = updatedUser;
    return of(userWithoutPassword).pipe(delay(1000));
  }

  deleteUser(id: number): Observable<void> {
    const index = this.mockUsers.findIndex(u => u.id === id);
    if (index === -1) {
      return throwError(() => new Error('User not found'));
    }

    // Prevent deleting the last admin
    const isAdmin = this.mockUsers[index].role === 'ADMIN';
    const remainingAdmins = this.mockUsers.filter(
      u => u.role === 'ADMIN' && u.id !== id
    ).length;

    if (isAdmin && remainingAdmins === 0) {
      return throwError(() => new Error('Cannot delete the last admin user'));
    }

    this.mockUsers.splice(index, 1);
    return of(void 0).pipe(delay(1000));
  }

  // Helper method to search users
  searchUsers(query: string): Observable<User[]> {
    const filteredUsers = this.mockUsers
      .filter(user => 
        user.username.toLowerCase().includes(query.toLowerCase()) ||
        user.email?.toLowerCase().includes(query.toLowerCase())
      )
      .map(user => {
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });

    return of(filteredUsers).pipe(delay(500));
  }
} 
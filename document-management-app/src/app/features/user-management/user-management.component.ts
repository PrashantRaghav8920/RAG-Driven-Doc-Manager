import { Component, computed, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../core/models/user.model';
import { selectUsers, selectUsersLoading } from '../../core/store/user-management/user-management.selectors';
import * as UserActions from '../../core/store/user-management/user-management.actions';

@Component({
  selector: 'app-user-management',
  standalone: false,
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss'
})
export class UserManagementComponent {
  users$: Observable<User[]>;
  loading$: Observable<boolean>;
  
  selectedUser = signal<User | null>(null);
  private _pageSize = signal(10);
  private _totalUsers = signal(0);
  
  pageSize = computed(() => this._pageSize());
  totalUsers = computed(() => this._totalUsers());
  userList = signal<User[]>([]);

  constructor(private store: Store) {
    this.users$ = this.store.select(selectUsers);
    this.users$.subscribe((users) => {
      this.userList.set(users);
      this._totalUsers.set(users.length);
    });
    this.loading$ = this.store.select(selectUsersLoading);
    this.loadUsers();
  }

 

  loadUsers(page: number = 0): void {
    this.users$.subscribe((users) => {
      console.log(users, 'users');
    });
    this.store.dispatch(UserActions.loadUsers({ 
      page, 
      pageSize: this.pageSize() 
    }));
  }

  saveUser(event: any): void {
    const userData = event.userData;
    const currentUser = this.selectedUser();
    if (currentUser) {
      this.store.dispatch(UserActions.updateUser({ 
        id: currentUser.id,
        changes: userData 
      }));
    } else {
      this.store.dispatch(UserActions.addUser({ user: userData as User }));
    }
    this.selectedUser.set(null);
  }

  deleteUser(event: any): void {
    const userId = event.userId;
    if (confirm('Are you sure you want to delete this user?')) {
      this.store.dispatch(UserActions.deleteUser({ userId }));
    }
  }

  onPageChange(event: any): void {
    this._pageSize.set(event.pageSize);
    this.loadUsers(event.pageIndex);
  }

}

import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../store/app.state';
import * as AuthActions from '../../store/auth/auth.actions';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { takeUntil, filter } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnDestroy {
  isAuthenticated$: Observable<boolean>;
  currentUser$: Observable<User | null>;
  private readonly destroy$ = new Subject<void>();

  constructor(private store: Store<AppState>, private router: Router) {
    this.isAuthenticated$ = this.store.select((state) => !!state.auth.user);
    this.currentUser$ = this.store.select((state) => state.auth.user);
    this.isAuthenticated$.pipe(
      takeUntil(this.destroy$),
      filter(isAuthenticated => !isAuthenticated)
    ).subscribe(() => this.router.navigate(['/home']));
  }

  onLogout(): void {
    this.store.dispatch(AuthActions.logout());
  }

  onHomeClick(): void {
    this.isAuthenticated$.pipe(
        takeUntil(this.destroy$),
    ).subscribe((isAuthenticated) => {
      this.router.navigate([isAuthenticated ? '/dashboard' : '/home']);
    })
  }



  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


}

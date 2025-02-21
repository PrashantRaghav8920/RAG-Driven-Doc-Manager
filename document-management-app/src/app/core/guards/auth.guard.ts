import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs/operators';
import { selectIsAuthenticated, selectCurrentUser } from '../store/auth/auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  private router = inject(Router);
  private store = inject(Store);

  canActivate() {
    return this.store.select(selectIsAuthenticated).pipe(
      take(1),
      map(isAuthenticated => {
        if (!isAuthenticated) {
          this.router.navigate(['/auth/login']);
          return false;
        }
        return true;
      })
    );
  }

  canActivateAdmin() {
    return this.store.select(selectCurrentUser).pipe(
      take(1),
      map(user => {
        if (!user || user.role !== 'ADMIN') {
          this.router.navigate(['/dashboard']);
          return false;
        }
        return true;
      })
    );
  }
} 
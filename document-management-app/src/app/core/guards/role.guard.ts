import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map, tap } from 'rxjs';
import { AppState } from '../store/app.state';
import { selectCurrentUser } from '../store/auth/auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const allowedRoles = route.data['roles'] as string[];

    return this.store.select(selectCurrentUser).pipe(
      map(user => {
        if (!user) return false;
        
        // If allowedRoles is not provided, allow access
        if (!allowedRoles || allowedRoles.length === 0) return true;
        
        // Check if user's role is in the allowed roles
        return allowedRoles.includes(user.role);
      }),
      tap(hasAccess => {
        if (!hasAccess) {
          console.warn('Access denied: Insufficient permissions');
          this.router.navigate(['/']);
        }
      })
    );
  }
} 
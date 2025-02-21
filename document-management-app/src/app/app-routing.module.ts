import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'user-management',
    loadChildren: () =>
      import('./features/user-management/user-management.module').then(
        (m) => m.UserManagementModule
      ),
    canActivate: [AuthGuard,RoleGuard],
  },
  {
    path: 'document-management',
    loadChildren: () =>
      import('./features/document-management/document-management.module').then(
        (m) => m.DocumentManagementModule
      ),
  },
  {
    path: 'ingestion-management',
    loadChildren: () =>
      import(
        './features/ingestion-management/ingestion-management.module'
      ).then((m) => m.IngestionManagementModule),
  },
  { path: 'qa', loadChildren: () => import('./features/qa/qa.module').then(m => m.QaModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

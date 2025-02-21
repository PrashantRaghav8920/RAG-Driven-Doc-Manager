import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthEffects } from './core/store/auth/auth.effects';
import { MaterialModule } from './shared/material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { CoreModule } from './core/core.module';
import { authReducer } from './core/store/auth/auth.reducer';
import { userManagementReducer } from './core/store/user-management/user-management.reducer';
import { MockApiService } from './core/services/mock-api.service';
import { UserManagementEffects } from './core/store/user-management/user-management.effects';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule,
    MaterialModule,
    RouterModule.forRoot([]),
    StoreModule.forRoot({
      auth: authReducer,
      userManagement: userManagementReducer
    }),
    EffectsModule.forRoot([AuthEffects, UserManagementEffects]),
  ],
  providers: [
    // provideHttpClient(withInterceptors([authInterceptor])),
    MockApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

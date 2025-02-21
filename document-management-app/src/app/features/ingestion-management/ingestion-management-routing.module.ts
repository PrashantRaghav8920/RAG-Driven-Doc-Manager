import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngestionManagementComponent } from './ingestion-management.component';

const routes: Routes = [{ path: '', component: IngestionManagementComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IngestionManagementRoutingModule { }

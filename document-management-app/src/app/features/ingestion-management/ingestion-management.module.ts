import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IngestionManagementRoutingModule } from './ingestion-management-routing.module';
import { IngestionManagementComponent } from './ingestion-management.component';
import { IngestionStatusComponent } from './ingestion-status/ingestion-status.component';


@NgModule({
  declarations: [
    IngestionManagementComponent,
    IngestionStatusComponent
  ],
  imports: [
    CommonModule,
    IngestionManagementRoutingModule
  ]
})
export class IngestionManagementModule { }

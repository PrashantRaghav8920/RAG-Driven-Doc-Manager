import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentManagementRoutingModule } from './document-management-routing.module';
import { DocumentManagementComponent } from './document-management.component';
import { DocumentListComponent } from './document-list/document-list.component';
import { DocumentUploadComponent } from './document-upload/document-upload.component';


@NgModule({
  declarations: [
    DocumentManagementComponent,
    DocumentListComponent,
    DocumentUploadComponent
  ],
  imports: [
    CommonModule,
    DocumentManagementRoutingModule
  ]
})
export class DocumentManagementModule { }

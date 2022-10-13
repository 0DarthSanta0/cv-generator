import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomTableComponent } from './custom-table/custom-table.component';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [
    CustomTableComponent,
  ],
  exports: [
    CustomTableComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    InputTextModule,
  ]
})
export class CustomTableModule {
}

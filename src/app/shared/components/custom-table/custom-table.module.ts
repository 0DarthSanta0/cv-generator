import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomTableComponent } from './custom-table/custom-table.component';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TranslateModule } from '@ngx-translate/core';

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
    ScrollingModule,
    TranslateModule,
  ]
})
export class CustomTableModule {
}

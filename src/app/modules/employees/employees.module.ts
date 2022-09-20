import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesTableComponent } from './employees-table/employees-table.component';
import { CustomTableModule } from '../../shared/components/custom-table/custom-table.module';
import { SpinnerModule } from '../../shared/components/spinner/spinner.module';


@NgModule({
  declarations: [
    EmployeesTableComponent
  ],
    imports: [
        CommonModule,
        EmployeesRoutingModule,
        CustomTableModule,
        SpinnerModule
    ]
})
export class EmployeesModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesTableComponent } from './components/employees-table/employees-table.component';
import { CustomTableModule } from '@components/custom-table/custom-table.module';
import { SpinnerModule } from '@components/spinner/spinner.module';
import { EmployeeInfoComponent } from './components/employee-info/employee-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PanelModule } from 'primeng/panel';
import { TranslateModule } from '@ngx-translate/core';
import { AppInputModule } from '@components/controls/input/app-input.module';
import { TextareaModule } from '@components/controls/textarea/textarea.module';
import { AutocompleteModule } from '@components/controls/autocomplete/autocomplete.module';
import { CustomButtonModule } from '@components/custom-button/custom-button.module';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [
    EmployeesTableComponent,
    EmployeeInfoComponent
  ],
    imports: [
        CommonModule,
        EmployeesRoutingModule,
        CustomTableModule,
        SpinnerModule,
        MenuModule,
        ButtonModule,
        AppInputModule,
        ReactiveFormsModule,
        TextareaModule,
        PanelModule,
        AutocompleteModule,
        CustomButtonModule,
        TranslateModule,
    ]
})
export class EmployeesModule { }

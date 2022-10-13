import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesTableComponent } from './components/employees-table/employees-table.component';
import { EmployeeInfoComponent } from './components/employee-info/employee-info.component';

const routes: Routes = [
    {path: '', component: EmployeesTableComponent},
    {path: ':id', component:EmployeeInfoComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EmployeesRoutingModule {
}

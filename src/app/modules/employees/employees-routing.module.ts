import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesTableComponent } from './components/employees-table/employees-table.component';
import { LinksComponent } from './components/links/links.component';

const routes: Routes = [
  {path: '', component: EmployeesTableComponent},
  {path: ':id', component: LinksComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule {
}

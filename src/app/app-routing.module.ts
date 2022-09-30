import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppRoutes} from "./shared/constants/app-routes";

const routes: Routes = [
   {path: '', pathMatch: 'full', redirectTo: '/register'},
   {path: AppRoutes.REGISTER_ROUTE, loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)},
   {path: AppRoutes.EMPLOYEES_ROUTE, loadChildren: () => import('./modules/employees/employees.module').then(m => m.EmployeesModule)},

];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule]
})
export class AppRoutingModule {
}

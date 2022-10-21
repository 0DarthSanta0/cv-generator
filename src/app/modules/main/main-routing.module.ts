import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from '../../shared/constants/app-routes';
import { MainPageComponent } from './pages/main-page/main-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    children: [
      {
        path: '',
        redirectTo: AppRoutes.EMPLOYEES_ROUTE,
        pathMatch: 'full',
      },
      {
        path: AppRoutes.EMPLOYEES_ROUTE,
        loadChildren: () => import('../employees/employees.module').then(m => m.EmployeesModule),
      },
      {
        path: AppRoutes.PROJECTS_ROUTE,
        loadChildren: () => import('../projects/projects.module').then(m => m.ProjectsModule),
      },
      {
        path: AppRoutes.CV_TEMPLATES_ROUTE,
        loadChildren: () => import('../cv-templates/cv-templates.module').then(m => m.CvTemplatesModule),
      },
      {
        path: AppRoutes.ENTITIES_ROUTE,
        loadChildren: () => import('../entities/entities.module').then(m => m.EntitiesModule),
      },
    ],
  },
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }

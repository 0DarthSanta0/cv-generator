import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from './shared/constants/app-routes';

const routes: Routes = [
  {
    path: AppRoutes.REGISTER_ROUTE,
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: AppRoutes.MAIN_ROUTE,
    loadChildren: () => import('./modules/main/main.module').then(m => m.MainModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}

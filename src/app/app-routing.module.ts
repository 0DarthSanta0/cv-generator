import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegistrComponent} from "./modules/auth/components/registr/registr.component";

const routes: Routes = [
   {path: '', pathMatch: 'full', redirectTo: '/registr'},
   {path: 'registr', component: RegistrComponent}
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule]
})
export class AppRoutingModule {
}

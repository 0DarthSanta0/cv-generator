import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntitiesPageComponent } from './components/entities-page/entities-page.component';
import { AddEntityComponent } from './components/add-entity/add-entity.component';

const routes: Routes = [
  {path: '', component: EntitiesPageComponent},
  {path: ':name', component: AddEntityComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntitiesRoutingModule {
}

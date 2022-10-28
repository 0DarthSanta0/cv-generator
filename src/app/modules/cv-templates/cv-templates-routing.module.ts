import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CvTemplatesListComponent } from './pages/cv-templates-list/cv-templates-list.component';
import { NewCvTemplateComponent } from './pages/new-cv-template/new-cv-template.component';
import { CvTemplatesInfoComponent } from './pages/cv-templates-info/cv-templates-info.component';
import { NEW_CV } from '@constants/cvs-routes';

const routes: Routes = [
  {
    path: '',
    component: CvTemplatesListComponent,
  },
  {
    path: NEW_CV,
    component: NewCvTemplateComponent,
  },
  {
    path: ':id',
    component: CvTemplatesInfoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CvTemplatesRoutingModule { }

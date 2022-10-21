import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsListComponent } from './pages/projects-list/projects-list.component';
import { ProjectInfoComponent } from './pages/project-info/project-info.component';
import { NewProjectComponent } from './pages/new-project/new-project.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectsListComponent,
  },
  {
    path: 'new',
    component: NewProjectComponent,
  },
  {
    path: ':id',
    component: ProjectInfoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }

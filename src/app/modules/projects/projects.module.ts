import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsListComponent } from './pages/projects-list/projects-list.component';
import { SpinnerModule } from '@components/spinner/spinner.module';
import { CustomTableModule } from '@components/custom-table/custom-table.module';

@NgModule({
  declarations: [
    ProjectsListComponent
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    SpinnerModule,
    CustomTableModule
  ]
})
export class ProjectsModule { }

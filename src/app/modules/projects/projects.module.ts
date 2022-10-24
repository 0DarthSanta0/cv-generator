import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsListComponent } from './pages/projects-list/projects-list.component';
import { SpinnerModule } from '@components/spinner/spinner.module';
import { CustomTableModule } from '@components/custom-table/custom-table.module';
import { ProjectInfoComponent } from './pages/project-info/project-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PanelModule } from 'primeng/panel';
import { AppInputModule } from '@components/controls/input/app-input.module';
import { AutocompleteModule } from '@components/controls/autocomplete/autocomplete.module';
import { TextareaModule } from '@components/controls/textarea/textarea.module';
import { CustomButtonModule } from '@components/custom-button/custom-button.module';
import { TranslateModule } from '@ngx-translate/core';
import { DatePickerModule } from '@components/controls/date-picker/date-picker.module';
import { NewProjectComponent } from './pages/new-project/new-project.component';

@NgModule({
  declarations: [
    ProjectsListComponent,
    ProjectInfoComponent,
    NewProjectComponent
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    SpinnerModule,
    CustomTableModule,
    ReactiveFormsModule,
    PanelModule,
    AppInputModule,
    AutocompleteModule,
    TextareaModule,
    CustomButtonModule,
    TranslateModule,
    DatePickerModule
  ]
})
export class ProjectsModule { }

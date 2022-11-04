import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CvTemplatesRoutingModule } from './cv-templates-routing.module';
import { CvTemplatesListComponent } from './pages/cv-templates-list/cv-templates-list.component';
import { CvTemplatesInfoComponent } from './pages/cv-templates-info/cv-templates-info.component';
import { NewCvTemplateComponent } from './pages/new-cv-template/new-cv-template.component';
import { SpinnerModule } from '@components/spinner/spinner.module';
import { CustomButtonModule } from '@components/custom-button/custom-button.module';
import { CustomTableModule } from '@components/custom-table/custom-table.module';
import { TranslateModule } from '@ngx-translate/core';
import { PanelModule } from 'primeng/panel';
import { ReactiveFormsModule } from '@angular/forms';
import { AppInputModule } from '@components/controls/input/app-input.module';
import { TextareaModule } from '@components/controls/textarea/textarea.module';
import { AutocompleteModule } from '@components/controls/autocomplete/autocomplete.module';


@NgModule({
    imports: [
        CommonModule,
        CvTemplatesRoutingModule,
        SpinnerModule,
        CustomButtonModule,
        CustomTableModule,
        TranslateModule,
        PanelModule,
        ReactiveFormsModule,
        AppInputModule,
        TextareaModule,
        AutocompleteModule
    ],
  declarations: [
    CvTemplatesListComponent,
    CvTemplatesInfoComponent,
    NewCvTemplateComponent
  ]
})
export class CvTemplatesModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntitiesRoutingModule } from './entities-routing.module';
import { EntitiesPageComponent } from './components/entities-page/entities-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { AddEntityComponent } from './components/add-entity/add-entity.component';
import { TranslateModule } from '@ngx-translate/core';
import { AppInputModule } from '@components/controls/input/app-input.module';
import { CustomButtonModule } from '@components/custom-button/custom-button.module';


@NgModule({
  imports: [
    CommonModule,
    EntitiesRoutingModule,
    ReactiveFormsModule,
    InputTextModule,
    TranslateModule,
    AppInputModule,
    CustomButtonModule,
  ],
  exports: [
  ],
  declarations: [
    EntitiesPageComponent,
    AddEntityComponent,
  ]
})
export class EntitiesModule { }

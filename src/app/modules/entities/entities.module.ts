import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntitiesRoutingModule } from './entities-routing.module';
import { EntitiesPageComponent } from './components/entities-page/entities-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { AddEntityComponent } from './components/add-entity/add-entity.component';
import { SearchFilterPipe } from '../../shared/pipes/search-filter.pipe';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  imports: [
    CommonModule,
    EntitiesRoutingModule,
    ReactiveFormsModule,
    InputTextModule,
    TranslateModule
  ],
  declarations: [
    EntitiesPageComponent,
    AddEntityComponent,
    SearchFilterPipe
  ]
})
export class EntitiesModule { }

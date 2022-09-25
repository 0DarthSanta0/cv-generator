import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { BreadcrumbsModule } from '../../shared/components/breadcrumbs/breadcrumbs.module';
import { ListboxModule } from 'primeng/listbox';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MainPageComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    BreadcrumbsModule,
    ListboxModule,
    FormsModule,
  ],
})
export class MainModule { }

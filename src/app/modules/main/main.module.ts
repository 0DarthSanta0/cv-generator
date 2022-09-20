import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { BreadcrumbsModule } from '../../shared/components/breadcrumbs/breadcrumbs.module';


@NgModule({
  declarations: [
    MainPageComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    BreadcrumbsModule,
  ]
})
export class MainModule { }

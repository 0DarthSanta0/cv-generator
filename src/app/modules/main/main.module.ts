import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { StoreModule } from '@ngrx/store';
import { breadcrumbsReducer } from '../../store/breadcrumbs/breadcrumbs.reducers';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MainRoutingModule,
    StoreModule.forRoot(breadcrumbsReducer),
  ]
})
export class MainModule { }

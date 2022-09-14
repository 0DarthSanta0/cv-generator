import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FormsModule, NgControl, ReactiveFormsModule} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {AppInput} from "./app-input.component";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
   declarations: [
      AppInput
   ],
   exports: [
      AppInput
   ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    TranslateModule
  ],
})
export class AppInputModule {
}
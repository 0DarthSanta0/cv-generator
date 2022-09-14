import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextareaComponent } from './textarea.component';
import {ReactiveFormsModule} from "@angular/forms";
import {InputTextareaModule} from "primeng/inputtextarea";
import {TranslateModule} from "@ngx-translate/core";



@NgModule({
   declarations: [
      TextareaComponent
   ],
   exports: [
      TextareaComponent
   ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextareaModule,
    TranslateModule
  ]
})
export class TextareaModule { }

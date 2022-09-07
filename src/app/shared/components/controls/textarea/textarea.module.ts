import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextareaComponent } from './textarea.component';
import {ReactiveFormsModule} from "@angular/forms";
import {InputTextareaModule} from "primeng/inputtextarea";



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
      InputTextareaModule
   ]
})
export class TextareaModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePickerComponent } from './date-picker.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CalendarModule} from "primeng/calendar";
import {TranslateModule} from "@ngx-translate/core";



@NgModule({
   declarations: [
      DatePickerComponent
   ],
   exports: [
      DatePickerComponent
   ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CalendarModule,
    FormsModule,
    TranslateModule
  ]
})
export class DatePickerModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordInputComponent } from './password-input.component';
import {ReactiveFormsModule} from "@angular/forms";
import {PasswordModule} from "primeng/password";
import {InputTextModule} from "primeng/inputtext";
import {TranslateModule} from "@ngx-translate/core";



@NgModule({
  declarations: [
    PasswordInputComponent
  ],
  exports: [
    PasswordInputComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PasswordModule,
    InputTextModule,
    TranslateModule
  ]
})
export class PasswordInputModule { }

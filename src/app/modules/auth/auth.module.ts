import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './auth-routing.module';
import {AppInputModule} from "../../shared/components/controls/input/app-input.module";
import {PasswordInputModule} from "../../shared/components/controls/password/password-input.module";
import {RegistrComponent} from './components/registr/registr.component';
import {ReactiveFormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";

@NgModule({
  declarations: [
    RegistrComponent
  ],
   imports: [
      CommonModule,
      AuthRoutingModule,
      AppInputModule,
      PasswordInputModule,
      ReactiveFormsModule,
      ButtonModule,
      RippleModule,
   ]
})
export class AuthModule { }

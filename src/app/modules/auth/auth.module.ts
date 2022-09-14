import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthRoutingModule} from './auth-routing.module';
import {AppInputModule} from "../../shared/components/controls/input/app-input.module";
import {PasswordInputModule} from "../../shared/components/controls/password/password-input.module";
import {RegisterComponent} from './components/register/register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {BackendErrorsComponent} from "../../shared/components/backend-errors/backend-errors.component";
import {AuthService} from "../../shared/services/http/auth.service";
import {LocalStorageService} from "../../shared/services/local-storage.service";
import {LoginComponent} from './components/login/login.component';
import {CheckboxModule} from "primeng/checkbox";
import {CustomButtonModule} from "../../shared/components/custom-button/custom-button.module";
import {TranslateModule} from "@ngx-translate/core";
import {DropdownModule} from "primeng/dropdown";

@NgModule({
  declarations: [
    RegisterComponent,
    BackendErrorsComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    AppInputModule,
    PasswordInputModule,
    ReactiveFormsModule,
    ButtonModule,
    RippleModule,
    CheckboxModule,
    FormsModule,
    CustomButtonModule,
    TranslateModule,
    DropdownModule,
  ],
  providers: [AuthService, LocalStorageService]
})
export class AuthModule {
}

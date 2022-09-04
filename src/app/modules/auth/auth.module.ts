import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthRoutingModule} from './auth-routing.module';
import {AppInputModule} from "../../shared/components/controls/input/app-input.module";
import {PasswordInputModule} from "../../shared/components/controls/password/password-input.module";
import {RegisterComponent} from './components/register/register.component';
import {ReactiveFormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {StoreModule} from "@ngrx/store";
import {reducers} from "../../store/auth/reducers";
import {EffectsModule} from "@ngrx/effects";
import {RegisterEffect} from "../../store/auth/effects/register.effect";
import {BackendErrorsComponent} from "../../shared/components/backend-errors/backend-errors.component";
import {AuthService} from "../../shared/services/http/auth.service";
import {LocalStorageService} from "../../shared/services/local-storage.service";

@NgModule({
  declarations: [
    RegisterComponent,
    BackendErrorsComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    AppInputModule,
    PasswordInputModule,
    ReactiveFormsModule,
    ButtonModule,
    RippleModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([RegisterEffect]),
  ],
  providers: [AuthService, LocalStorageService]
})
export class AuthModule {
}

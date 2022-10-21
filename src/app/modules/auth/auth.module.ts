import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { AppInputModule } from '@components/controls/input/app-input.module';
import { PasswordInputModule } from '@components/controls/password/password-input.module';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { BackendErrorsComponent } from '@components/backend-errors/backend-errors.component';
import { AuthService } from '@services/http/auth.service';
import { LocalStorageService } from '@services/local-storage.service';
import { LoginComponent } from './components/login/login.component';
import { CheckboxModule } from 'primeng/checkbox';
import { CustomButtonModule } from '@components/custom-button/custom-button.module';
import { TranslateModule } from '@ngx-translate/core';
import { DropdownModule } from 'primeng/dropdown';
import { AuthHeaderComponent } from './components/auth-header/auth-header.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { AppDropdownModule } from '@components/controls/app-dropdown/app-dropdown.module';

@NgModule({
    declarations: [
        RegisterComponent,
        BackendErrorsComponent,
        LoginComponent,
        AuthHeaderComponent
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
        InputSwitchModule,
        AppDropdownModule,
    ],
    exports: [
        AuthHeaderComponent
    ],
    providers: [AuthService, LocalStorageService]
})
export class AuthModule {
}

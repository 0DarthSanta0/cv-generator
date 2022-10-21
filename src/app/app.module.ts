import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppInputModule } from '@components/controls/input/app-input.module';
import { AutocompleteModule } from '@components/controls/autocomplete/autocomplete.module';
import { PasswordModule } from 'primeng/password';
import { DatePickerModule } from '@components/controls/date-picker/date-picker.module';
import { AuthModule } from './modules/auth/auth.module';
import { StoreModule } from '@ngrx/store';
import { environment } from '@environment/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { CustomButtonModule } from '@components/custom-button/custom-button.module';
import { AuthEffects } from './store/auth/auth-effects.service';
import { appReducers } from './store';
import { MissingTranslationHandler, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MissingTranslationService } from '@services/missing-translation.service';
import { EmployeesEffects } from './store/employees/employees-effects.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainEffects } from '@ourStore/main/main-effects';
import { EntitiesEffects } from '@ourStore/entities/entities-effects';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppInputModule,
        AutocompleteModule,
        PasswordModule,
        CustomButtonModule,
        DatePickerModule,
        AuthModule,
        StoreModule.forRoot(appReducers, {
            runtimeChecks: {
                strictActionImmutability: true,
                strictActionSerializability: true,
                strictStateImmutability: true,
                strictStateSerializability: true,
            },
        }),
        EffectsModule.forRoot([AuthEffects, EmployeesEffects, MainEffects, EntitiesEffects]),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: environment.production,
            autoPause: true,
        }),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
            missingTranslationHandler: {provide: MissingTranslationHandler, useClass: MissingTranslationService},
            useDefaultLang: false,
        })
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }
    ],
    exports: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

export function HttpLoaderFactory(http: HttpClient): TranslateLoader {
    return new TranslateHttpLoader(http, './assets/locale/', '.json');
}
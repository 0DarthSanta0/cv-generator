import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ReactiveFormsModule} from "@angular/forms";
import {AppInputModule} from "./shared/components/controls/input/app-input.module";
import {AutocompleteModule} from "./shared/components/controls/autocomplete/autocomplete.module";
import {PasswordModule} from "primeng/password";
import {DatePickerModule} from "./shared/components/controls/date-picker/date-picker.module";
import {AuthModule} from "./modules/auth/auth.module";
import {StoreModule} from "@ngrx/store";
import {environment} from "../environments/environment";
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {EffectsModule} from "@ngrx/effects";
import {LocalStorageService} from "./shared/services/local-storage.service";
import {AuthInterceptor} from "./shared/interceptors/auth.interceptor";
import {CustomButtonModule} from "./shared/components/custom-button/custom-button.module";
import {AuthEffect} from "./store/auth/auth.effect";
import {appReducers} from "./store";
import {MissingTranslationHandler, TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {MissingTranslationService} from "./shared/utils/missing-translation.service";
import { EmployeesEffect } from './store/employees/employees.effect';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
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
    EffectsModule.forRoot([AuthEffect, EmployeesEffect]),
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
      missingTranslationHandler: { provide: MissingTranslationHandler, useClass: MissingTranslationService },
      useDefaultLang: false,
    })
  ],
  providers: [
    LocalStorageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

export function HttpLoaderFactory(http: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(http, './assets/locale/', '.json');
}
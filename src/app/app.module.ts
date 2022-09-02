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

@NgModule({
   declarations: [
      AppComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      ReactiveFormsModule,
      AppInputModule,
      AutocompleteModule,
      PasswordModule,
      DatePickerModule,
      AuthModule
   ],
   providers: [],
   bootstrap: [AppComponent]
})
export class AppModule {
}

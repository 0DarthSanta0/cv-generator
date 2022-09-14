import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AutocompleteComponent} from './autocomplete.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AutoCompleteModule} from "primeng/autocomplete";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from "@angular/platform-browser";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
   declarations: [
      AutocompleteComponent
   ],
   exports: [
      AutocompleteComponent
   ],
  imports: [
    CommonModule,
    FormsModule,
    AutoCompleteModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    TranslateModule
  ]
})
export class AutocompleteModule {
}

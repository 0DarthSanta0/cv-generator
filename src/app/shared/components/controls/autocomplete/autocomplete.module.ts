import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteComponent } from './autocomplete.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TranslateModule } from '@ngx-translate/core';

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
      TranslateModule
  ]
})
export class AutocompleteModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomButtonComponent} from './custom-button.component';
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";

@NgModule({
  declarations: [
    CustomButtonComponent
  ],
  exports: [
    CustomButtonComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    RippleModule
  ]
})
export class CustomButtonModule {
}

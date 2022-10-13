import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppDropdownComponent } from './app-dropdown/app-dropdown.component';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AppDropdownComponent
    ],
    exports: [
        AppDropdownComponent
    ],
    imports: [
        CommonModule,
        DropdownModule,
        ReactiveFormsModule
    ]
})
export class AppDropdownModule { }

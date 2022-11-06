import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { BreadcrumbsModule } from '@components/breadcrumbs/breadcrumbs.module';
import { ListboxModule } from 'primeng/listbox';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthModule } from '../auth/auth.module';


@NgModule({
  declarations: [
    MainPageComponent,
    HeaderComponent,
    FooterComponent
  ],
    imports: [
        CommonModule,
        MainRoutingModule,
        BreadcrumbsModule,
        ListboxModule,
        FormsModule,
        AuthModule,
    ],
})
export class MainModule { }

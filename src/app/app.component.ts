import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {getCurrentUserAction} from "./store/auth/actions/current-user.action";
import {TranslateService} from "@ngx-translate/core";
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
      private store: Store,
      private translateService: TranslateService
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(getCurrentUserAction());
    this.translateService.use(environment.defaultLocale);
  }
}

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getCurrentUserAction } from './store/auth/actions/current-user.action';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { isLoggedIn } from './store/auth/auth.selectors';
import { AppRoutes } from './shared/constants/app-routes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private store: Store,
    private translateService: TranslateService,
    private route: Router,
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(getCurrentUserAction());
    this.store.select(isLoggedIn).subscribe(
      (isLogged: boolean | null) => {
        this.route.navigate([`/${isLogged ? AppRoutes.MAIN_ROUTE : AppRoutes.REGISTER_ROUTE}`]);
      }
    );
    this.translateService.use(environment.defaultLocale);
  }
}

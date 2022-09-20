import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { setBreadcrumbs } from '../../../../store/breadcrumbs/breadcrumbs.actions';
import { AppRoutes } from '../../../../shared/constants/app-routes';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent implements OnInit {

  constructor(
    private store: Store,
    private cdr: ChangeDetectorRef,
  ) { }

  public ngOnInit(): void {
    this.store.dispatch(setBreadcrumbs({
      breadcrumbs: [
        { label: AppRoutes.MAIN_ROUTE, url: undefined },
      ]
    }));
  }

}

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { AppRoutes } from '../../constants/app-routes';
import { Store } from '@ngrx/store';
import { selectBreadcrumbs } from '../../../store/breadcrumbs/breadcrumbs.selectors';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbsComponent implements OnInit {

  public breadcrumbs$: Observable<MenuItem[]> = of([
    { label: AppRoutes.MAIN_ROUTE, }
  ]);

  constructor(
    private store: Store,
    private cdr: ChangeDetectorRef,
  ) { }

  public ngOnInit(): void {
    this.breadcrumbs$ = this.store.select(selectBreadcrumbs);
  }

}

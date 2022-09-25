import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { setBreadcrumbs } from '../../../../store/breadcrumbs/breadcrumbs.actions';
import { AppRoutes } from '../../../../shared/constants/app-routes';
import { SelectEvent } from '../../../../shared/models/interfaces/select.event';
import { Router } from '@angular/router';
import { MainModulesTitles } from '../../../../shared/constants/main-modules-titles';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent implements OnInit {

  public listElements: SelectEvent[] = [
    {
      value: MainModulesTitles.EMPLOYEES_VALUE,
      label: MainModulesTitles.EMPLOYEES_LABEL,
    },
    {
      value: MainModulesTitles.PROJECTS_VALUE,
      label: MainModulesTitles.PROJECTS_LABEL,
    },
    {
      value: MainModulesTitles.CV_TEMPLATES_VALUE,
      label: MainModulesTitles.CV_TEMPLATES_LABEL,
    },
    {
      value: MainModulesTitles.ENTITIES_VALUE,
      label: MainModulesTitles.ENTITIES_LABEL,
    },
  ];

  public selected: SelectEvent = {
    value: MainModulesTitles.MAIN_VALUE,
    label: MainModulesTitles.MAIN_LABEL,
  };

  constructor(
    private store: Store,
    private cdr: ChangeDetectorRef,
    private route: Router,
  ) { }

  public ngOnInit(): void {
   this.setBreadcrumbs();
  }

  public select(event: SelectEvent): void {
    this.route.navigate([`/${MainModulesTitles.MAIN_LABEL}/${event.value}`]);
  }

  private setBreadcrumbs(): void {
    this.store.dispatch(setBreadcrumbs({
      breadcrumbs: [
        { label: AppRoutes.MAIN_ROUTE, url: undefined },
      ]
    }));
  }

}

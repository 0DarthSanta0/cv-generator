import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { map, MonoTypeOperatorFunction, Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AppRoutes } from '@constants/app-routes';
import { MenuItem } from 'primeng/api';
import { CV_TEMPLATES, MAIN } from '@constants/breadcrumbs';
import { COLUMNS_NAMES_CV } from '@constants/cvs-titles';
import { CVsInterface } from '@models/interfaces/cvs.interface';
import { NEW_CV } from '@constants/cvs-routes';
import { setBreadcrumbs } from '@ourStore/breadcrumbs/breadcrumbs.actions';
import { getCVsList } from '@ourStore/cvs/cvs.actions';
import { cvsListSelector, isLoadingCVSelector } from '@ourStore/cvs/cvs.selectors';
import { untilDestroyed } from '../../../../shared/functions/unsubscribe.operator';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-cv-templates-list',
  templateUrl: './cv-templates-list.component.html',
  styleUrls: ['./cv-templates-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvTemplatesListComponent implements OnInit {

  public isLoading$: Observable<boolean>;
  public cvs$: Observable<CVsInterface[]>;

  public columnNames: { [key: string]: string } = COLUMNS_NAMES_CV;
  public globalFilteredFields: string[] = Object.keys(COLUMNS_NAMES_CV);

  private destroy$: MonoTypeOperatorFunction<CVsInterface[]> = untilDestroyed();

  constructor(
    private store: Store,
    private router: Router,
    private translate: TranslateService,
  ) {
  }

  public ngOnInit(): void {
    this.setBreadcrumbs();
    this.selectCVs();
  }

  public navigateToInfoPage(id: string): void {
    this.router.navigate([AppRoutes.MAIN_ROUTE + '/' + AppRoutes.CV_TEMPLATES_ROUTE, id]);
  }

  public navigateToNewCVPage(): void {
    this.router.navigate([AppRoutes.MAIN_ROUTE + '/' + AppRoutes.CV_TEMPLATES_ROUTE + '/' + NEW_CV]);
  }

  private setBreadcrumbs(): void {
    const breadcrumbs: MenuItem[] = [
      {label: this.translate.instant(MAIN) },
      {label: this.translate.instant(CV_TEMPLATES), routerLink: AppRoutes.CV_TEMPLATES_ROUTE},
    ];
    this.store.dispatch(setBreadcrumbs({breadcrumbs}));
  }

  private selectCVs(): void {
    this.store.dispatch(getCVsList());
    this.cvs$ = this.store.pipe(
      select(cvsListSelector),
      map(cvs => [...cvs]),
      this.destroy$,
    );
    this.isLoading$ = this.store.select(isLoadingCVSelector);
  }

}

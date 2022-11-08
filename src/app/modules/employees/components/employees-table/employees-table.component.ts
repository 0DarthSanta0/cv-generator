import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { employeesListAction } from '@ourStore/employees/employees.actions';
import { isLoadingSelector, listEmployeesSelector } from '@ourStore/employees/employees.selectors';
import { IEmployeesWithSkills } from '@models/employees.interface';
import { Router } from '@angular/router';
import { AppRoutes } from '@constants/app-routes';
import { MenuItem } from 'primeng/api';
import { EMPLOYEES, MAIN } from '@constants/breadcrumbs';
import { setBreadcrumbs } from '@ourStore/breadcrumbs/breadcrumbs.actions';
import { COLUMN_TABLE_NAMES } from '@constants/employee';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-employees-table',
  templateUrl: './employees-table.component.html',
  styleUrls: ['./employees-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeesTableComponent implements OnInit {

  public isLoading$: Observable<boolean>;
  public employeesWithSkills$: Observable<IEmployeesWithSkills[]>;

  public globalFilteredFields: string[] = Object.keys(COLUMN_TABLE_NAMES);
  public columnNames: {[key: string] : string} = COLUMN_TABLE_NAMES;

  constructor(private store: Store,
              private router: Router,
              private translate: TranslateService,
  ) {
  }

  ngOnInit(): void {
    this.setBreadcrumbs();
    this.store.dispatch(employeesListAction());
    this.getDataFromStore();
  }

  public redirectToEmployeesInfo(id: string): void {
    this.router.navigate([AppRoutes.EMPLOYEES_ID_ROUTE, id]);
  }

  private setBreadcrumbs(): void {
    const breadcrumbs: MenuItem[] = [
      {label: this.translate.instant(MAIN) },
      {label: this.translate.instant(EMPLOYEES), routerLink: AppRoutes.EMPLOYEES_ROUTE},
    ];
    this.store.dispatch(setBreadcrumbs({breadcrumbs}));
  }

  private getDataFromStore(): void {
    this.employeesWithSkills$ = this.store.pipe(
      select(listEmployeesSelector),
      map(empl => [...empl])
    );
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
  }

}

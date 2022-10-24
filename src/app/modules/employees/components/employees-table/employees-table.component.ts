import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { employeesListAction } from '@ourStore/employees/employees.actions';
import { isLoadingSelector, listEmployeesSelector } from '@ourStore/employees/employees.selectors';
import { IEmployeesWithSkills } from '@models/employees.interface';
import { Router } from '@angular/router';
import { AppRoutes } from '@constants/app-routes';
import { COLUMN_TABLE_NAMES } from '@constants/employee';
import { MenuItem } from 'primeng/api';
import { EMPLOYEES, MAIN } from '@constants/breadcrumbs';
import { setBreadcrumbs } from '@ourStore/breadcrumbs/breadcrumbs.actions';

@Component({
  selector: 'app-employees-table',
  templateUrl: './employees-table.component.html',
  styleUrls: ['./employees-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeesTableComponent implements OnInit {

  public isLoading$: Observable<boolean>;
  public employeesWithSkills$: Observable<IEmployeesWithSkills[]>;

  public columnNames: string[] = COLUMN_TABLE_NAMES;

  constructor(private store: Store,
              private router: Router,
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
      {label: MAIN, routerLink: AppRoutes.EMPLOYEES_ROUTE},
      {label: EMPLOYEES, routerLink: AppRoutes.EMPLOYEES_ROUTE},
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

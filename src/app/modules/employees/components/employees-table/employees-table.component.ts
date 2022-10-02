import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { employeesListAction } from '@ourStore/employees/employees.actions';
import { isLoadingSelector, listEmployeesSelector } from '@ourStore/employees/employees.selectors';
import { IEmployeesWithSkills } from '@models/employees.interface';
import { Router } from '@angular/router';
import { AppRoutes } from '@constants/app-routes';
import { COLUMN_NAMES } from '@constants/table-value';

@Component({
    selector: 'app-employees-table',
    templateUrl: './employees-table.component.html',
    styleUrls: ['./employees-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeesTableComponent implements OnInit {

    public isLoading$: Observable<boolean>;
    public employeesWithSkills$: Observable<IEmployeesWithSkills[]>;

    public columnNames: string[] = COLUMN_NAMES;

    constructor(private store: Store,
                private router: Router,
    ) {
    }

    ngOnInit(): void {
        this.store.dispatch(employeesListAction());
        this.getDataFromStore();
    }

    public redirectToEmployeesInfo(id: string): void {
        this.router.navigate([AppRoutes.EMPLOYEES_ROUTE, id]);
    }

    private getDataFromStore(): void {
        this.employeesWithSkills$ = this.store.pipe(
            select(listEmployeesSelector),
            map(empl => [...empl])
        );
        this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    }

}

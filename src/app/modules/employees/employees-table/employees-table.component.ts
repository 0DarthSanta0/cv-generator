import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { employeesListAction } from '../../../store/employees/actions/employees-table.action';
import { isLoadingSelector, listEmployeesSelector } from '../../../store/employees/employees.selectors';
import { EmployeesInterface } from '../../../shared/models/interfaces/employees.interface';

@Component({
    selector: 'app-employees-table',
    templateUrl: './employees-table.component.html',
    styleUrls: ['./employees-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeesTableComponent implements OnInit {

    public isLoading$: Observable<boolean>;
    public employees$: Observable<EmployeesInterface[]>;

    constructor(private store: Store,
    ) {
    }

    ngOnInit(): void {
        this.store.dispatch(employeesListAction());
        this.getDataFromStore();
    }

    private getDataFromStore(): void {
        this.employees$ = this.store.pipe(
            select(listEmployeesSelector),
            map((employees) => [...employees])
        );
        this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    }

}

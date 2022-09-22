import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { employeesListAction } from '../../../store/employees/actions/employees-table.action';
import { isLoadingSelector, listEmployeesWithSkillsSelector } from '../../../store/employees/employees.selectors';
import { IEmployeesWithSkills } from '../../../shared/models/employees.interface';
import { Router } from '@angular/router';
import { AppRoutes } from '../../../shared/constants/app-routes';

@Component({
    selector: 'app-employees-table',
    templateUrl: './employees-table.component.html',
    styleUrls: ['./employees-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeesTableComponent implements OnInit {

    public isLoading$: Observable<boolean>;
    public employeesWithSkills$: Observable<IEmployeesWithSkills[]>;

    public columnNames: string[] = ['firstName', 'lastName', 'email', 'position', 'skills'];

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
            select(listEmployeesWithSkillsSelector),
        );
        this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    }

}

import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getCurrentUser } from '@ourStore/auth/auth.selectors';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {

    public userName: string = '';

    private destroy$ = new Subject<void>();

    constructor(private store: Store) {
    }

    ngOnInit(): void {
        this.store.pipe(
            select(getCurrentUser),
            takeUntil(this.destroy$)
        ).subscribe((user) => {
            this.userName = user?.firstName + ' ' + user?.lastName
        })
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

}

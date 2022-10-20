import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getCurrentUser } from '@ourStore/auth/auth.selectors';
import { Observable } from 'rxjs';
import { UserInterface } from '@models/user.interface';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

    public currentUser$: Observable<UserInterface | null>

    constructor(private store: Store) {
    }

    ngOnInit(): void {
        this.currentUser$ = this.store.pipe(select(getCurrentUser))
    }

}

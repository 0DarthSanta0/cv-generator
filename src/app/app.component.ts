import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getCurrentUserAction } from './store/auth/actions/current-user.action';
import { languagesListAction, positionsListAction, skillsListAction } from '@ourStore/employees/employees.actions';
import { LanguageService } from '@utils/language.service';
import { ThemeService } from '@utils/theme.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    constructor(
        private store: Store,
        private languageService: LanguageService,
        private themeService: ThemeService,
    ) {
    }

    ngOnInit(): void {
        this.store.dispatch(skillsListAction());
        this.store.dispatch(languagesListAction());
        this.store.dispatch(positionsListAction());
        this.store.dispatch(getCurrentUserAction());
        this.languageService.setDefaultLanguage();
        this.themeService.setDefaultTheme();
    }
}

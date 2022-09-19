import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getCurrentUserAction } from './store/auth/actions/current-user.action';
import { LanguageService } from './shared/utils/language.service';
import { ThemeService } from './shared/utils/theme.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    constructor(
        private store: Store,
        private languageService: LanguageService,
        private themeService: ThemeService
    ) {
    }

    ngOnInit(): void {
        this.store.dispatch(getCurrentUserAction());
        this.languageService.setDefaultLanguage();
        this.themeService.setDefaultTheme();
    }
}

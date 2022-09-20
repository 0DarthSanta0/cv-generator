import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { environment, HeaderForm, LanguageService, Theme, ThemeService } from '../../index'

@Component({
    selector: 'app-auth-header',
    templateUrl: './auth-header.component.html',
    styleUrls: ['./auth-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthHeaderComponent implements OnInit, OnDestroy {

    public readonly LANGUAGES: string[] = environment.locales;
    public headerForm: FormGroup;

    private destroy$ = new Subject<void>();

    constructor(
        private formBuilder: FormBuilder,
        private languageService: LanguageService,
        private themeService: ThemeService,
    ) {
    }

    ngOnInit(): void {
        this.initializeForm();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private initializeForm(): void {
        this.headerForm = this.formBuilder.group(<HeaderForm>{
                language: new FormControl(this.languageService.getCurrentLanguage()),
                themeSwitcher: new FormControl(this.themeService.getStatusForSwitchInput())
            }
        );
        this.headerForm.controls.language
            .valueChanges
            .pipe(
                takeUntil(this.destroy$)
            )
            .subscribe((language: string) => {
                this.languageService.changeLanguage(language);
            });

        this.headerForm.controls.themeSwitcher
            .valueChanges
            .pipe(
                takeUntil(this.destroy$)
            )
            .subscribe((isTurnOnTheme: boolean) => {
                const theme = isTurnOnTheme ? Theme.DARK : Theme.LIGHT;
                this.themeService.switchTheme(theme);
            });
    }
}

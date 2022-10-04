import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { environment } from '@environment/environment';
import { LanguageService } from '@services/language.service';
import { ThemeService } from '@services/theme.service';
import { HeaderForm } from '@auth';
import { Theme } from '@constants/theme';
import { FormGroup, NonNullableFormBuilder } from '@angular/forms';

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
        private formBuilder: NonNullableFormBuilder,
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
        this.headerForm = this.formBuilder.group<HeaderForm>({
                language: this.formBuilder.control(this.languageService.getCurrentLanguage()),
                themeSwitcher: this.formBuilder.control(this.themeService.getStatusForSwitchInput())
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

import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Subject, takeUntil} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {LanguageService} from "../../../../shared/utils/language.service";
import {ThemeService} from "../../../../shared/utils/theme.service";
import {Theme} from "../../../../shared/constants/theme";

interface HeaderForm {
  language: FormControl,
  switchTheme: FormControl
}

@Component({
  selector: 'app-auth-header',
  templateUrl: './auth-header.component.html',
  styleUrls: ['./auth-header.component.scss']
})
export class AuthHeaderComponent implements OnInit, OnDestroy {

  public readonly languages: string[] = environment.locales;
  public headerForm: FormGroup;

  private destroy$ = new Subject<void>();

  constructor(
      private formBuilder: FormBuilder,
      private languageService: LanguageService,
      private themeService: ThemeService
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
          switchTheme: new FormControl(this.themeService.getStatusForSwitchInput())
        }
    );
    this.headerForm.get('language')!
        .valueChanges
        .pipe(
            takeUntil(this.destroy$)
        )
        .subscribe((v) => {
          this.languageService.changeLanguage(v);
        });

    this.headerForm.get('switchTheme')!
        .valueChanges
        .pipe(
            takeUntil(this.destroy$)
        )
        .subscribe((v) => {
          if (v) {
            this.themeService.switchTheme(Theme.dark);
          } else {
            this.themeService.switchTheme(Theme.light);
          }
        });
  }

}

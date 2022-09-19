import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {LocalStorageService} from "../services/local-storage.service";
import {environment} from "../../../environments/environment";
import {Theme} from "../constants/theme";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(
      @Inject(DOCUMENT) private document: Document,
      private localStorage: LocalStorageService
  ) {
  }

  public switchTheme(theme: string): void {
    this.localStorage.setValue('theme', theme);
    let themeLink = this.document.getElementById('app-theme') as HTMLLinkElement;

    this.applyCustomTheme(theme);

    if (themeLink) {
      themeLink.href = theme + '.css';
    }

  }

  public getStatusForSwitchInput(): boolean {
    return !(this.localStorage.getValue('theme') === environment.defaultTheme);
  }

  public setDefaultTheme(): void {
    if (!this.localStorage.getValue('theme')) {
      this.switchTheme(environment.defaultTheme);
    } else {
      this.switchTheme(this.localStorage.getValue('theme'));
    }
  }

  private applyCustomTheme(theme: string): void {
    switch (theme) {
      case Theme.light:
        this.document.body.removeAttribute('dark');
        this.document.body.setAttribute('light', '');
        break;
      case Theme.dark:
        this.document.body.removeAttribute('light');
        this.document.body.setAttribute('dark', '');
        break;
    }

  }
}

import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { LocalStorageService } from '@services/local-storage.service';
import { environment } from '@environment/environment';
import { Theme } from '@constants/theme';
import { LocalStorageKeysEnum } from '@constants/local-storage-keys';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {

    constructor(
        @Inject(DOCUMENT) private document: Document,
        private localStorage: LocalStorageService
    ) {
    }

    public switchTheme(theme: Theme): void {
        this.localStorage.setValue(LocalStorageKeysEnum.THEME, theme);
        const themeLink = this.document.getElementById('app-theme') as HTMLLinkElement;

        this.applyCustomTheme(theme);

        if (themeLink) {
            themeLink.href = theme + '.css';
        }
    }

    public getStatusForSwitchInput(): boolean {
        return !(this.localStorage.getValue(LocalStorageKeysEnum.THEME) === environment.defaultTheme);
    }

    public setDefaultTheme(): void {
        const theme = this.localStorage.getValue(LocalStorageKeysEnum.THEME) || environment.defaultTheme;
        this.switchTheme(theme);
    }

    private applyCustomTheme(theme: Theme): void {

        if (theme === Theme.LIGHT){
            this.document.body.removeAttribute(Theme.DARK);
        }
        this.document.body.setAttribute(theme, '');
    }
}

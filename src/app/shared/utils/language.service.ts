import {Injectable} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {LocalStorageService} from "../services/local-storage.service";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(
      private translateService: TranslateService,
      private localStorage: LocalStorageService
  ) {
  }

  public changeLanguage(lang: string): void {
    this.localStorage.setValue('language', lang);
    this.translateService.use(lang);
  }

  public getCurrentLanguage(): string {
    return this.localStorage.getValue('language');
  }

  public setDefaultLanguage(): void {
    if (!this.localStorage.getValue('language')) {
      this.translateService.use(environment.defaultLocale);
    } else {
      this.translateService.use(this.localStorage.getValue('language'));
    }
  }
}

import {Injectable} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {LocalStorageService} from '@services/local-storage.service';
import {environment} from '@environment/environment';
import { LocalStorageKeysEnum } from '@constants/local-storage-keys';

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
    this.localStorage.setValue(LocalStorageKeysEnum.LANGUAGE, lang);
    this.translateService.use(lang);
  }

  public getCurrentLanguage(): string {
    return this.localStorage.getValue(LocalStorageKeysEnum.LANGUAGE);
  }

  public setDefaultLanguage(): void {
    const language = this.localStorage.getValue(LocalStorageKeysEnum.LANGUAGE) || environment.defaultLocale;
    this.changeLanguage(language);
  }
}

import {ChangeDetectionStrategy, Component} from '@angular/core';
import {BaseControl} from '../../../models/base-control';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordInputComponent extends BaseControl {

  public isShowPassword: boolean = false;

  public changeShowPassword(): void {
    this.isShowPassword = !this.isShowPassword;
  }
}

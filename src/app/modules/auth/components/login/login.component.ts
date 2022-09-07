import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {BackendErrorsInterface} from "../../../../shared/models/backend-errors.interface";
import {select, Store} from "@ngrx/store";
import {isSubmittingSelector, validationErrorsSelector} from "../../../../store/auth/auth.selectors";
import {LoginRequestInterface} from "../../../../store/auth/models/login-request.interface";
import {loginAction} from "../../../../store/auth/actions/login.actions";

interface LoginForm {
  identifier: FormControl<string>,
  password: FormControl<string>,
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../register/register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  public isSubmitting$: Observable<boolean>;
  public backendErrors$: Observable<BackendErrorsInterface | null>;

  constructor(
      private fb: FormBuilder,
      private store: Store
  ) {
  }

  ngOnInit(): void {
    this.initializeForm();
    this.initializeValues();
  }

  public onSubmit() {
    const request: LoginRequestInterface = {
      user: this.loginForm.value
    }
    this.store.dispatch(loginAction({request}));
  }

  private initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
  }

  private initializeForm(): void {
    this.loginForm = this.fb.group(<LoginForm>{
      identifier: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

}

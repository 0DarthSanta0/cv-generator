import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {isSubmittingSelector, validationErrorsSelector} from "../../../../store/auth/auth.selectors";
import {BackendErrorsInterface} from "../../../../shared/models/backend-errors.interface";
import {RegisterRequestInterface} from "../../../../store/auth/models/register-request.interface";
import {RoutingMap} from "../../../../shared/constants/routing-map";
import {registerAction} from "../../../../store/auth/actions/register.actions";

interface RegisterForm {
  username: FormControl<string>,
  email: FormControl<string>,
  password: FormControl<string>,
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;

  public isSubmitting$: Observable<boolean>;
  public backendErrors$: Observable<BackendErrorsInterface | null>;

  public ROUTING_MAP: string = RoutingMap.LOGIN_ROUTE;

  constructor(
      private fb: FormBuilder,
      private store: Store
  ) {
  }

  ngOnInit(): void {
    this.initializeForm();
    this.initializeValues();
  }

  private initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
  }

  private initializeForm(): void {
    this.registerForm = this.fb.group(<RegisterForm>{
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  public onSubmit() {
    const request: RegisterRequestInterface = {
      user: this.registerForm.value,
    }
    this.store.dispatch(registerAction({request}))
  }
}
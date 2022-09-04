import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {select, Store} from "@ngrx/store";
import {registerAction} from "../../../../store/auth/actions/register.action";
import {Observable} from "rxjs";
import {isSubmittingSelector, validationErrorsSelector} from "../../../../store/auth/selectors";
import {BackendErrorsInterface} from "../../../../shared/models/backend-errors.interface";
import {RegisterRequestInterface} from "../../../../store/auth/models/register-request.interface";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;
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

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
  }

  initializeForm(): void {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    const request: RegisterRequestInterface = {
      user: this.registerForm.value
    }
    this.store.dispatch(registerAction({request}))
  }
}

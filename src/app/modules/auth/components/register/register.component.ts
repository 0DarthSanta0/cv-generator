import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { REQUIRED_EMAIL_FIELD, REQUIRED_FIELD } from '@constants/validation-errors';
import { AppRoutes } from '@constants/app-routes';
import { environment } from '@environment/environment';
import { BackendErrorsInterface } from '@models/backend-errors.interface';
import { RegisterRequestInterface } from '@ourStore/auth/models/register-request.interface';
import { registerAction } from '@ourStore/auth/actions/register.actions';
import { isSubmittingSelector, validationErrorsSelector } from '@ourStore/auth/auth.selectors';
import { RegisterForm } from '@auth';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit, OnDestroy {

    public requiredField = REQUIRED_FIELD;
    public requiredEmailField = REQUIRED_EMAIL_FIELD;
    public readonly loginRoute: string = '/' + AppRoutes.LOGIN_ROUTE;
    public readonly languages: string[] = environment.locales;

    public registerForm: FormGroup;

    public isSubmitting$: Observable<boolean>;
    public backendErrors$: Observable<BackendErrorsInterface | null>;
    private destroy$ = new Subject<void>();

    constructor(
        private formBuilder: NonNullableFormBuilder,
        private store: Store,
    ) {
    }

    ngOnInit(): void {
        this.initializeForm();
        this.initializeValues();
    }

    public onSubmit() {
        const request: RegisterRequestInterface = {
            user: this.registerForm.value,
        }
        this.store.dispatch(registerAction({request}));
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private initializeValues(): void {
        this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
        this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
    }

    private initializeForm(): void {
        this.registerForm = this.formBuilder.group<RegisterForm>({
            username: this.formBuilder.control('', [Validators.required]),
            email: this.formBuilder.control('', [Validators.required, Validators.email]),
            password: this.formBuilder.control('', [Validators.required, Validators.minLength(6)]),
        });
    }
}
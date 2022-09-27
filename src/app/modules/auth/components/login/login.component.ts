import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { REQUIRED_EMAIL_FIELD, REQUIRED_FIELD } from '@constants/validation-errors';
import { AppRoutes } from '@constants/app-routes';
import { environment } from '@environment/environment';
import { BackendErrorsInterface } from '@models/backend-errors.interface';
import { LoginRequestInterface } from '@ourStore/auth/models/login-request.interface';
import { loginAction } from '@ourStore/auth/actions/login.actions';
import { isSubmittingSelector, validationErrorsSelector } from '@ourStore/auth/auth.selectors';
import { LoginForm } from '@auth';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss', '../register/register.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, OnDestroy {

    public requiredField = REQUIRED_FIELD;
    public requiredEmailField = REQUIRED_EMAIL_FIELD;
    public readonly registerRoute: string = '/' + AppRoutes.REGISTER_ROUTE;
    public readonly languages: string[] = environment.locales;

    public loginForm: FormGroup;

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
        this.getDataFromStore();
    }

    public onSubmit() {
        const request: LoginRequestInterface = {
            user: this.loginForm.value
        }
        this.store.dispatch(loginAction({request}));
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private getDataFromStore(): void {
        this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
        this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
    }

    private initializeForm(): void {
        this.loginForm = this.formBuilder.group<LoginForm>({
            identifier: this.formBuilder.control('', [Validators.required]),
            password: this.formBuilder.control('', [Validators.required, Validators.minLength(6)])
        });
    }

}

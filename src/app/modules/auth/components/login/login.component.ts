import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { select, Store } from '@ngrx/store';
import {
    AppRoutes,
    BackendErrorsInterface,
    environment,
    isSubmittingSelector,
    loginAction,
    LoginRequestInterface,
    REQUIRED_EMAIL_FIELD,
    REQUIRED_FIELD,
    validationErrorsSelector,
    LoginForm
} from '../../index';

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
        private formBuilder: FormBuilder,
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
        this.loginForm = this.formBuilder.group(<LoginForm>{
            identifier: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required, Validators.minLength(6)])
        });
    }

}

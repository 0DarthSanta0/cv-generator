import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import {
    AppRoutes,
    BackendErrorsInterface,
    environment,
    isSubmittingSelector,
    registerAction,
    RegisterRequestInterface,
    REQUIRED_EMAIL_FIELD,
    REQUIRED_FIELD,
    validationErrorsSelector,
    RegisterForm
} from '../../index';

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
        private formBuilder: FormBuilder,
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
        this.registerForm = this.formBuilder.group(<RegisterForm>{
            username: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        });

    }
}
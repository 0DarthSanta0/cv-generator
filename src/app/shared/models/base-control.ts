import {ControlValueAccessor, FormControl, NgControl, ValidationErrors} from '@angular/forms';
import {ChangeDetectorRef, Directive, Input, OnInit} from '@angular/core';
import {startWith} from 'rxjs';

@Directive()
export class BaseControl implements ControlValueAccessor, OnInit {

  @Input() public errorsMap: { [key: string]: string } | null = null;
  @Input() public label: string = '';
  @Input() public placeholder: string = '';

  public control: FormControl = new FormControl();

  public disabled: boolean = false;
  public error: string = '';
  public isRequired: boolean = false;

  constructor(
      public ngControl: NgControl,
      private changeDetectorRef: ChangeDetectorRef
  ) {
    this.ngControl.valueAccessor = this;
  }

  public onChange = (value: any) => {
  };

  public onTouched = () => {
  };

  ngOnInit(): void {
    this.initValueChangeListener();
    this.initStatusListener();
  }

  registerOnChange(fn: () => {}): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.control.disable();
    } else {
      this.control.enable();
    }
  }

  writeValue(outsideValue: string): void {
    this.control.setValue(outsideValue);
  }

  public initValueChangeListener(): void {
    this.control.valueChanges.subscribe((value) => this.onChange(value));
  }

  public getErrorMessage(formErrors: ValidationErrors | null | undefined, status: string): string {
    const errorKeys = Object.keys(formErrors || {});
    const key = (errorKeys.length && errorKeys[0]) || undefined;
    if (!key) {
      return '';
    }
    return status === 'INVALID'
        ? this.errorsMap?.[key] || ''
        : '';
  }

  private initStatusListener(): void {
    this.ngControl.control?.statusChanges
        .pipe(
            startWith(this.ngControl?.control?.status)
        )
        .subscribe((status: string) => {
          this.error = this.getErrorMessage(this.ngControl?.control?.errors, status);
          this.requiredCheck();
          this.synchronizeValidators();
          this.changeDetectorRef.markForCheck();
        });
  }

  private requiredCheck(): void {
    if (this.ngControl.control?.validator) {
      const validators = this.ngControl.control?.validator(this.ngControl.control);
      this.isRequired = validators ? validators['required'] : false;
    }
  }

  private synchronizeValidators(): void {
    this.control.setValidators(this.ngControl.control!.validator);
    this.control.setErrors(this.ngControl.control!.errors);
  }
}
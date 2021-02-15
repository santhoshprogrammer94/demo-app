import { AbstractControl, ValidatorFn, FormControl } from '@angular/forms';
import { AbstractControlUtil } from '../abstract-control-util';

// tslint:disable-next-line:variable-name
export class PasswordValidators {

    public static repeatCharacterRegexRule(repeatCount: number) {
        const validator = (control: AbstractControl): { [key: string]: any } => {
            if (AbstractControlUtil.isNotPresent(control)) return undefined;
            let repeatDec = repeatCount - 1;
            let pattern = '([^\\x00-\\x1F])\\1{' + repeatDec + '}';
            if (control.value !== '' && new RegExp(pattern).test(control.value)) {
                return { 'repeatCharacterRegexRule': { 'repeatCount': repeatCount } };
            }
            return undefined;
        };
        return validator;
    };

    public static allowedCharacterRule(allowedChars: string[]): ValidatorFn {
        const validator = (control: AbstractControl): { [key: string]: any } => {
            if (AbstractControlUtil.isNotPresent(control)) return undefined;
            let value: string = control.value;
            let valid = true;
            let invalidChars: string[] = [];

            for (let char of value) {
                if (allowedChars.indexOf(char) === -1) {
                    valid = false;
                    if (invalidChars.indexOf(char) === -1) {
                        invalidChars.push(char);
                    }
                }
            }
            if (!valid) {
                return { 'allowedCharacterRule': { 'invalidChars': invalidChars, 'allowedChars': allowedChars } };
            }
            return undefined;
        };
        return validator;
    };

    public static alphabeticalCharacterRule(amount: number): ValidatorFn {
        const validator = (control: AbstractControl): { [key: string]: any } => {
            if (AbstractControlUtil.isNotPresent(control)) return undefined;
            let value: string = control.value;
            if (value.length === 0) {
                return undefined;
            }
            let pattern = /[^A-Za-z]+/g;
            let stripped = value.replace(pattern, '');
            if (stripped.length < amount) {
                return { 'alphabeticalCharacterRule': { 'required': amount, 'actual': stripped.length } };
            }
            return undefined;
        };
        return validator;
    };

    public static digitCharacterRule(amount: number): ValidatorFn {
        const validator = (control: AbstractControl): { [key: string]: any } => {
            if (AbstractControlUtil.isNotPresent(control)) return undefined;
            let value: string = control.value;
            if (value.length === 0) {
                return undefined;
            }
            let pattern = /[^0-9\.]+/g;
            let stripped = value.replace(pattern, '');
            if (stripped.length < amount) {
                return { 'digitCharacterRule': { 'required': amount, 'actual': stripped.length } };
            }
            return undefined;
        };
        return validator;
    };

    public static lowercaseCharacterRule(amount: number): ValidatorFn {
        const validator = (control: AbstractControl): { [key: string]: any } => {
            if (AbstractControlUtil.isNotPresent(control)) return undefined;
            let value: string = control.value;
            if (value.length === 0) {
                return undefined;
            }
            let pattern = /[^a-z]+/g;
            let stripped = value.replace(pattern, '');
            if (stripped.length < amount) {
                return { 'lowercaseCharacterRule': { 'required': amount, 'actual': stripped.length } };
            }
            return undefined;
        };
        return validator;
    };

    public static uppercaseCharacterRule(amount: number): ValidatorFn {
        const validator = (control: AbstractControl): { [key: string]: any } => {
            if (AbstractControlUtil.isNotPresent(control)) return undefined;
            let value: string = control.value;
            if (value.length === 0) {
                return undefined;
            }
            let pattern = /[^A-Z]+/g;
            let stripped = value.replace(pattern, '');
            if (stripped.length < amount) {
                return { 'uppercaseCharacterRule': { 'required': amount, 'actual': stripped.length } };
            }
            return undefined;
        };
        return validator;
    };

    public static specialCharacterRule(amount: number): ValidatorFn {
        const validator = (control: AbstractControl): { [key: string]: any } => {
            if (AbstractControlUtil.isNotPresent(control)) return undefined;
            let value: string = control.value;
            if (value.length === 0) {
                return undefined;
            }
            let pattern = /[\w\s]+/g;
            let stripped = value.replace(pattern, '');
            if (stripped.length < amount) {
                return { 'specialCharacterRule': { 'required': amount, 'actual': stripped.length } };
            }
            return undefined;
        };
        return validator;
    };

    public static mismatchedPasswords(passwordControlName?: string, confirmPasswordControlName?: string): ValidatorFn {
        const validator = (group: AbstractControl): { [key: string]: any } => {
            let newPasswordValue = group.get(passwordControlName ? passwordControlName : 'password').value;
            let newPasswordConfirmValue = group.get(confirmPasswordControlName ? confirmPasswordControlName : 'confirmPassword').value;
            if (newPasswordValue !== newPasswordConfirmValue) {
                AbstractControlUtil.addError(group.get(confirmPasswordControlName ? confirmPasswordControlName : 'confirmPassword'), 'mismatchedPasswords', true)

                return { 'mismatchedPasswords': true };
            } else {
                AbstractControlUtil.removeError(group.get(confirmPasswordControlName ? confirmPasswordControlName : 'confirmPassword'), 'mismatchedPasswords');
            }
            return undefined;

        };
        return validator;
    };

    public static matchOtherValidator (otherControlName: string) : ValidatorFn {

        let thisControl: FormControl;
        let otherControl: FormControl;

        return function matchOtherValidate (control: FormControl) {

          if (!control.parent) {
            return null;
          }

          // Initializing the validator.
          if (!thisControl) {
            thisControl = control;
            otherControl = control.parent.get(otherControlName) as FormControl;
            if (!otherControl) {
              throw new Error('matchOtherValidator(): other control is not found in parent group');
            }
            otherControl.valueChanges.subscribe(() => {
              thisControl.updateValueAndValidity();
            });
          }

          if (!otherControl) {
            return null;
          }

          if (otherControl.value !== thisControl.value) {
            return {
                matchOtherValidator: true
            };
          }

          return null;

        }

      }

}

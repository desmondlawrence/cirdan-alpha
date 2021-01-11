import { AbstractControl, ValidatorFn } from '@angular/forms';

export function numberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const inputValue = control.value;
    const inputIsNumber = (!isNaN(inputValue));
    return inputIsNumber ? null : { NAN: true };
  };
}

export function integerValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const inputValue = control.value;
    const inputIsInteger = (
      !isNaN(inputValue) &&
      (parseFloat(inputValue) === parseInt(inputValue, 10))
    );
    return inputIsInteger ? null : { NAI: true };
  };
}


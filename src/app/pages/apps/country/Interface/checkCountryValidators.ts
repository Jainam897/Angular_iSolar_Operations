import { AbstractControl, ValidationErrors, AsyncValidatorFn, FormGroup } from '@angular/forms';
import { CountryService } from './country.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


export function uniqueCountryNameValidator (countryService:CountryService):AsyncValidatorFn{
    return (c:AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
        console.log('c:::', c);
        console.log('c.value', c.value);

        const data = {
            "countryName": c.value
        }

        return countryService.checkCountryName(data).pipe(
            map(country=>{
                console.log('country::', country);
                console.log('c.value', c.value);
                return country.status === -1  ? {'uniqueCountry':true}:null;
            })
        );
    };
}

// export function uniqueCountryNameValidator(countryService:CountryService) {
//     return (formGroup: FormGroup) => {
//         console.log('formGroup', formGroup);
//       const controlName = formGroup.controls[controlName];
//       conso
//     //   const matchingControl = formGroup.controls[matchingControlName];
  
//     //   if (matchingControl.errors && !matchingControl.errors.mustMatch) {
//     //     return;
//     //   }
  
//     //   if (control.value !== matchingControl.value) {
//     //     matchingControl.setErrors({ mustMatch: true });
//     //   } else {
//     //     matchingControl.setErrors(null);
//     //   }
//     };
//   }
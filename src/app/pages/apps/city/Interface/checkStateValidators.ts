import { AbstractControl, ValidationErrors, AsyncValidatorFn, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CityService } from './city.service';


export function uniqueCityNameValidator (cityService:CityService):AsyncValidatorFn{
    return (c:AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
        // console.log('c:::', c);
        // console.log('c.value', c.value);

        const data = {
            "cityName": c.value
        }

        return cityService.checkCityName(data).pipe(

            map(city=>{
                // console.log('state::', state);
                // console.log('c.value', c.value);
                return city.status === -1  ? {'uniqueCity':true}:null;
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
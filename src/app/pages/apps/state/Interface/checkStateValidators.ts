import { AbstractControl, ValidationErrors, AsyncValidatorFn, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StateService } from './state.service';


export function uniqueStateNameValidator (stateService:StateService):AsyncValidatorFn{
    return (c:AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
        // console.log('c:::', c);
        // console.log('c.value', c.value);

        const data = {
            "stateName": c.value
        }

        return stateService.checkStateName(data).pipe(

            map(state=>{
                // console.log('state::', state);
                // console.log('c.value', c.value);
                return state.status === -1  ? {'uniqueState':true}:null;
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
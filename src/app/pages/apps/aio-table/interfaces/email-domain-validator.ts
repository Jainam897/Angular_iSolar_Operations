import { FormControl } from "@angular/forms";


// export function emailDomainValidator(control: AbstractControl): { [key: string]: any } | null {
//     console.log('control.value');
//     const email: string = control.value;
//     const domain = email.substring(email.lastIndexOf('@') + 1);
//     if (email === '' || domain.toLowerCase() === 'gmail.com') {
//       return null;
//     }
//     else {
//       return { 'emailDomain': true };
//     }
//   }

export function emailDomainValidator(control: FormControl) { 
    console.log('control value', control.value);
    let email = control.value; 
    if (email && email.indexOf("@") != -1) { 
      let [_, domain] = email.split("@");
      if (domain !== "gmail.com") { 
        return {
          emailDomain: {
            parsedDomain: domain
          }
        }
      }
    }
    return null; 
}
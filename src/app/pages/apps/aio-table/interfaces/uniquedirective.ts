import {Directive}  from '@angular/core';
import { AsyncValidator, ValidationErrors, AbstractControl, NG_ASYNC_VALIDATORS, AsyncValidatorFn } from '@angular/forms';
import {Observable} from 'rxjs';
import {StudentService} from './student.service'; 
import { map } from 'rxjs/operators';


export function uniqueEmailValidator (studentService:StudentService):AsyncValidatorFn{

    return (c:AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
        // console.log('c:::', c);
        console.log('c.value', c.value);
        return studentService.getStudentMail(c.value).pipe(
            map(user=>{
                console.log('users::', user);
                console.log('c.value', c.value);
                return user  ? {'uniqueEmail':true}:null;
            })
        );
        // if (!c.value) {
        //     return;
        // } else {
        //     console.log('ELSE::');
        //     return studentsservice.getStudentMail(c.value).pipe(
        //         map(user=>{
        //             console.log('users::', user);
        //             console.log('c.value', c.value);
        //             return user && user.length > 0 ? {'uniqueEmail':true}:null;
        //         })
        //     );
        // }
    };
}

@Directive({
selector:'[uniqueEmail]',
providers:[{provide:NG_ASYNC_VALIDATORS,useExisting:uniquedirective, multi:true}]
})


export class uniquedirective implements AsyncValidator{
    constructor(private studentsservice: StudentService){

    }

    validate(c:AbstractControl):Promise<ValidationErrors | null> | Observable<ValidationErrors | null>{
        return this.studentsservice.getStudentMail(c.value).pipe(map(user=>{
            return user && user.length > 0 ? {'uniqueEmail':true}:null;
            console.log(c.value);
        }))
    };
        
    
}

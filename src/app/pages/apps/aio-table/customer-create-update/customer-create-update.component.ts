import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, AbstractControl, FormGroup, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Customer } from '../interfaces/customer.model';
import icMoreVert from '@iconify/icons-ic/twotone-more-vert';
import icClose from '@iconify/icons-ic/twotone-close';
import icPrint from '@iconify/icons-ic/twotone-print';
import icDownload from '@iconify/icons-ic/twotone-cloud-download';
import icDelete from '@iconify/icons-ic/twotone-delete';
import icPhone from '@iconify/icons-ic/twotone-phone';
import icPerson from '@iconify/icons-ic/twotone-person';
import icMyLocation from '@iconify/icons-ic/twotone-my-location';
import icLocationCity from '@iconify/icons-ic/twotone-location-city';
import icEditLocation from '@iconify/icons-ic/twotone-edit-location';
import { StudentService } from '../interfaces/student.service';
import { from } from 'rxjs';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Students } from '../interfaces/students';
import { HttpClient } from '@angular/common/http';
import { uniqueEmailValidator } from '../interfaces/uniquedirective';
import { emailDomainValidator } from '../interfaces/email-domain-validator';



@Component({
  selector: 'vex-customer-create-update',
  templateUrl: './customer-create-update.component.html',
  styleUrls: ['./customer-create-update.component.scss']
})
export class CustomerCreateUpdateComponent implements OnInit {

  static id = 100;
  private duplicateEmail;

  form: FormGroup;
  mode: 'create' | 'update' = 'create';

  icMoreVert = icMoreVert;
  icClose = icClose;

  icPrint = icPrint;
  icDownload = icDownload;
  icDelete = icDelete;

  icPerson = icPerson;
  icMyLocation = icMyLocation;
  icLocationCity = icLocationCity;
  icEditLocation = icEditLocation;
  icPhone = icPhone;
  routeParams: any;

  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<CustomerCreateUpdateComponent>,
    private fb: FormBuilder, private http: HttpClient, private studentService: StudentService, private route: ActivatedRoute, private router: Router) {
    this.routeParams = JSON.parse(this.route.snapshot.paramMap.get('students'));
    console.log("route", this.routeParams)
    this.createForm();
  }

  ngOnInit() {
    console.log('mode::', this.mode);
    console.log('defaults::', this.defaults);
    if (this.defaults) {
      console.log('IF:::');
      this.mode = 'update';
      this.form.controls.fname.setValue(this.defaults.fname);
      this.form.controls.lname.setValue(this.defaults.lname);
      this.form.controls.gmail.setValue(this.defaults.gmail);
      this.form.controls.gmail.disable();
    } else {
      console.log('ELSE:::');
      this.defaults = {} as Students;
    }
  }

  createForm() {
    this.form = this.fb.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      gmail: ['', [Validators.required, emailDomainValidator],uniqueEmailValidator(this.studentService)],

    });
  }

  save() {
    if (this.mode === 'create') {
      this.createCustomer();
    } else if (this.mode === 'update') {
      this.updateCustomer();
    }
  }






  createCustomer() {
    const customer = this.form.value;

    // if (!customer.imageSrc) {
    //   customer.imageSrc = 'assets/img/avatars/1.jpg';
    // }


    this.studentService.insertStudent(this.form.value)
      .subscribe(data => {
        this.router.navigate(['']);


      });
    this.dialogRef.close(customer);

    // this.dialogRef.close(customer);
  }

  updateCustomer() {
    const students = this.form.value;
    students.id = this.defaults.id;
    console.log('this.form.value', this.form.value)
    console.log('this.form.getRawValue', this.form.getRawValue())
    this.studentService.updateStudentdata(this.defaults.id, this.form.getRawValue())
      .subscribe();
    this.dialogRef.close(students);
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }

  emailDomain(control: AbstractControl): { [key: string]: any } | null {
    const email: string = control.value;
    const domain = email.substring(email.lastIndexOf('@') + 1);
    if (email === '' || domain.toLowerCase() === 'gmail.com') {
      return null;
    }
    else {
      return { 'emailDomain': true };
    }
  }

  // namelenght(control: AbstractControl): { [key: string]: any } | null {
  //   const name: string = control.value;
  //   if(name==='' || name.length<2){
  //     return null;
  //   }
  //   else{
  //     return{'namelenght': true};
  //   }
  // }


  checkEmailNotTaken(id: any) {
    return this.studentService.getStudentById(id);


  }


}

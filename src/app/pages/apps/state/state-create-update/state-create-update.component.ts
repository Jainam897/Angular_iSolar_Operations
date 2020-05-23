import { Component, OnInit,Inject, Input } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { StateService } from '../Interface/state.service';
import { getuser } from '../Interface/getuser';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { CountryService } from '../../country/Interface/country.service';
import { uniqueStateNameValidator } from '../Interface/checkStateValidators';
import { ErrorStateMatcher } from '@angular/material/core';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'vex-state-create-update',
  templateUrl: './state-create-update.component.html',
  styleUrls: ['./state-create-update.component.scss']
})
export class StateCreateUpdateComponent implements OnInit {
  form: FormGroup;
  getus: getuser[];
  isEditMode = false;


  @Input()
  columns: TableColumn<getuser>[] = [
    { label: 'stateName', property: 'text', type: 'text', visible: true },
    

  ];
  matcher = new MyErrorStateMatcher();


  constructor(private fb: FormBuilder, private stateService: StateService, private dialogRef: MatDialogRef<StateCreateUpdateComponent>,
    private router: Router, @Inject(MAT_DIALOG_DATA) public data: any,public countryService:CountryService) {this.createForm();
    }

  ngOnInit(): void {
    console.log('dta::::::::::',this.data);
    this.getCountry();
    if (this.data) {
      this.isEditMode = true;
      this.updateState();
    } else {
      // this.getCountry();
  
      // this.createForm();
    }
  }
  createForm() {
    this.form = this.fb.group({
      country:['', Validators.required],
      stateName: ['', [Validators.required, Validators.minLength(3)],
         uniqueStateNameValidator(this.stateService)
      ]
    })
  }

  save() {
    // console.log('this.form.valid', this.form.valid);
    console.log('from value', this.form.value);
    if (this.isEditMode) {
      console.log('EDIT MODE');
      const tempData: any = {
        id: this.data._id,
        country: this.form.controls.country.value,
        stateName: this.form.controls.stateName.value,
      }

      this.stateService.savestatedetails(tempData).subscribe((res) => {
        console.log('reS::', res);
        console.log(this.form.value);
        this.dialogRef.close(this.form.value);
      })
    } else {
      
        this.stateService.savestatedetails(this.form.value).subscribe((response) => {
          console.log('res', response);
          // this.getCountry();
          this.dialogRef.close(this.form.value);
        });
      
      
    }
  }

  getCountry() {
    // console.log('GET COUNTRY');
    this.countryService.listCountries()
      .subscribe((data: any) => {
        console.log('data:::', data);
        this.getus = data.results;
        console.log('this.getus', this.getus);
       
      });
  }


  updateState() {
    // console.log('from value', this.form.value);
    console.log('this.data', this.data);
    this.stateService.getStateById(this.data._id)
      .subscribe((response:any) => {
        console.log('response', response);
        this.form.controls.stateName.setValue(response.state.stateName);
        this.form.controls.country.setValue(response.state.country._id);
        // this.getus.push(
        //   {}
        // );
      });
    }
}

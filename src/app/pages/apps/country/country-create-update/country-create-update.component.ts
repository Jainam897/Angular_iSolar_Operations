import { Component, OnInit, Inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryService } from '../Interface/country.service';
import { uniqueCountryNameValidator } from '../Interface/checkCountryValidators';
import { getuser } from '../Interface/getuser';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'vex-country-create-update',
  templateUrl: './country-create-update.component.html',
  styleUrls: ['./country-create-update.component.scss']
})
export class CountryCreateUpdateComponent implements OnInit {
  form: FormGroup;
  getus: getuser[];
  isEditMode = false;

  constructor(private fb: FormBuilder, private countryService: CountryService, private dialogRef: MatDialogRef<CountryCreateUpdateComponent>,
    private router: Router, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.createForm();
  }

  ngOnInit(): void {
    if (this.data) {
      this.isEditMode = true;
      this.updateCountry();
    } else {

    }
  }

  createForm() {
    this.form = this.fb.group({
      countryName: ['', [Validators.required, Validators.minLength(3)], uniqueCountryNameValidator(this.countryService)]
    })
  }


  save() {
    // console.log('this.form.valid', this.form.valid);
    console.log('from value', this.form.value);
    if (this.isEditMode) {
      console.log('EDIT MODE');
      const tempData: any = {
        id: this.data._id,
        countryName: this.form.controls.countryName.value,
      }

      this.countryService.savecountrydetails(tempData).subscribe((res) => {
        console.log('reS::', res);
        this.dialogRef.close(this.form.value);
      })
    } else {
      this.countryService.savecountrydetails(this.form.value).subscribe((response) => {
        // console.log('res', response);
        // this.getCountry();
        this.dialogRef.close(this.form.value);
      });
    }
  }

  getCountry() {
    // console.log('GET COUNTRY');
    this.countryService.listCountries()
      .subscribe((data: any) => {
        if (data) {
          this.getus = data.results;
          // console.log(this.getus);
        }
      });
  }


  updateCountry() {
    // console.log('from value', this.form.value);
    console.log('this.data', this.data);
    this.countryService.getCountryById(this.data)
      .subscribe((response:any) => {
        console.log(response);
        this.form.controls.countryName.setValue(response.country.countryName);
      });
    }
}

import { Component, OnInit, Input, Inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CityService } from '../Interface/city.service';
import { getuser } from '../Interface/getuser';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { CountryService } from '../../country/Interface/country.service';
import { StateService } from '../../state/Interface/state.service';
import { uniqueCityNameValidator } from '../Interface/checkStateValidators';

@Component({
  selector: 'vex-city-create-update',
  templateUrl: './city-create-update.component.html',
  styleUrls: ['./city-create-update.component.scss']
})
export class CityCreateUpdateComponent implements OnInit {
  form: FormGroup;
  getus: getuser[];
  getcountry: any;
  getstate: any;
  isEditMode = false;

  @Input()
  columns: TableColumn<getuser>[] = [
    { label: 'cityName', property: 'text', type: 'text', visible: true },


  ];

  constructor(private fb: FormBuilder, private cityService: CityService, private dialogRef: MatDialogRef<CityCreateUpdateComponent>,
    private router: Router, @Inject(MAT_DIALOG_DATA) public data: any, public countryService: CountryService, public stateService: StateService) {
    this.createForm();

  }

  ngOnInit(): void {
    console.log('dta::::::::::', this.data);
    this.getCountry();
    if (this.data) {
      this.isEditMode = true;
      this.updateCity();
    } else {
      // this.getCountry();

      // this.createForm();
    }
  }

  createForm() {
    this.form = this.fb.group({
      country: ['', Validators.required],
      state: ['', Validators.required],
      cityName: ['', [Validators.required, Validators.minLength(3)], uniqueCityNameValidator(this.cityService)]
    })
  }

  save() {
    // console.log('this.form.valid', this.form.valid);
    console.log('from value', this.form.value);
    if (this.isEditMode) {
      console.log('EDIT MODE');
      const tempData: any = {
        id: this.data.id,
        state: this.form.controls.state.value,
        cityName: this.form.controls.cityName.value,
        country:this.form.controls.country.value,
      }

      console.log('tempData::', tempData);

      this.cityService.savecitydetails(tempData).subscribe((res) => {
        console.log('reS::', res);
        this.dialogRef.close(this.form.value);
      })
    } else {


      this.cityService.savecitydetails(this.form.value).subscribe((response) => {
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
        this.getcountry = data.results;
        // console.log('this.getCountry', this.getCountry);
      });
  }



  updateCity() {
    // console.log('from value', this.form.value);
    console.log('this.data', this.data);
    this.form.controls.country.setValue(this.data.countryId);
    this.form.controls.state.setValue(this.data.stateId);
    this.form.controls.cityName.setValue(this.data.cityName);
    console.log('FORM VALUE::::', this.form.value);
    this.onCountryChange(this.data.countryId);
    // this.cityService.getCityById(this.data._id)
    //   .subscribe((response: any) => {
    //     console.log('response', response);
    //     this.form.controls.country.setValue(response.city.state.country._id);
    //     this.form.controls.state.setValue(response.city.state._id);
    //     this.form.controls.cityName.setValue(response.city.cityName);
    //     console.log('FORM VALUE::::', this.form.value);
    //     // this.getus.push(
    //     //   {}
    //     // );
    //   });
  }
  // getState() {
  //   // console.log('GET COUNTRY');
  //   this.stateService.listStates()
  //     .subscribe((data: any) => {
  //       console.log('data:::', data);
  //       this.getus = data.results;
  //       console.log('this.getus', this.getus);

  //     });
  // }

  // public tempDataArray = [
  //   {
  //     countryId: '',
  //     countryName: '',
  //     states: [
  //       {
  //         _id:  '',
  //         stateName: '',
  //         city: [
  //           {
  //             _id: '',
  //             cityName: '',
  //           }
  //         ]
  //       },
  //       {
  //         _id:  '',
  //         stateName: ''
  //       },
  //     ]
  //   },
  //   {
  //     countryId: 'AUS',
  //     states: [
  //       {
  //         _id:  '',
  //         stateName: 's1'
  //       },
  //       {
  //         _id:  '',
  //         stateName: 's2'
  //       },
  //     ]
  //   }
  // ];


  onCountryChange(countryId) {
    console.log('countryId::::', countryId);
    if (countryId) {
      console.log('IF:::');
      this.cityService.checkCountrywiseState({ forCountry: countryId }).subscribe((response: any) => {
        console.log('Responce State', response);
        this.getus = response.results;
        console.log('this.getus::', this.getus);
      });

    }

  }
}

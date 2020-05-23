import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { getuser } from './Interface/getuser';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { ThemePalette } from '@angular/material/core';

import icEdit from '@iconify/icons-ic/twotone-edit';
import icDelete from '@iconify/icons-ic/twotone-delete';
import icSearch from '@iconify/icons-ic/twotone-search';
import { MatTableDataSource } from '@angular/material/table';
import icAdd from '@iconify/icons-ic/twotone-add';
import icMoreHoriz from '@iconify/icons-ic/twotone-more-horiz';
import theme from '../../../../@vex/utils/tailwindcss';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { CityService } from './Interface/city.service';
import { CityCreateUpdateComponent } from './city-create-update/city-create-update.component';



@Component({
  selector: 'vex-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss'],
  animations: [
    fadeInUp400ms,
    stagger40ms
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'standard'
      } as MatFormFieldDefaultOptions
    }
  ]



})
export class CityComponent implements OnInit {
  _id: any;
  getus: getuser[];
  icAdd = icAdd;
  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;
  theme = theme;
  icSearch = icSearch;
  icMoreHoriz = icMoreHoriz;
  pageSize = 5;
  icEdit = icEdit;
  icDelete = icDelete;
  pageSizeOptions: number[] = [5, 10, 20, 50];


  dataSource: MatTableDataSource<any> | null;

  @Input()
  columns: TableColumn<getuser>[] = [
    { label: 'Cities', property: 'cityName', type: 'text', visible: true },
    { label: 'States', property: 'stateName', type: 'text', visible: true },
    { label: 'Countries', property: 'countryName', type: 'text', visible: true },
    { label: 'Status', property: 'isActive', type: 'button', visible: true },
    { label: 'Actions', property: 'actions', type: 'badge', visible: true },

  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  active = false;
  constructor(public dialog: MatDialog, private cityService: CityService) { }

  ngOnInit(): void {
    this.getCityWithStateWithCountry();
  }
  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  // getCity() {
  //   // console.log('GET COUNTRY');
  //   this.cityService.listCities()
  //     .subscribe((data: any) => {
  //       console.log('data:::', data);
  //       this.getus = data.results;
  //       console.log('this.getus', this.getus);
  //       this.dataSource = new MatTableDataSource();
  //       console.log('this.dataSource before', this.dataSource);
  //       this.dataSource.data = data.results;
  //       this.dataSource.paginator = this.paginator;
  //       this.dataSource.sort = this.sort;
  //     });
  // }
  trackByProperty<T>(index: number, column: TableColumn<T>) {
    return column.property;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  deleteCity(deletaCityData: any) {
    // console.log('from value', this.form.value);
    console.log('this.data', deletaCityData);
    this.cityService.checkForDeleteCity({ _id: deletaCityData._id })
      .subscribe((response: any) => {
        console.log(response);
        if (response.status === 1) {
          this.cityService.deleteCityData(deletaCityData._id).subscribe((response: any) => {
            console.log(deletaCityData._id);
            console.log(response.message);
            this.getCityWithStateWithCountry()
          });

        }
        else {
          console.log('Not deleted');
          this.getCityWithStateWithCountry()
        }
      });
  }

  openDialog(): void {
    this.dialog.open(CityCreateUpdateComponent).afterClosed().subscribe((getus: getuser) => {
      if (this.getus) {
        // this.getStateWithCountry();
        this.getCityWithStateWithCountry()

      }
    });
  }

  getCityWithStateWithCountry() {
    let tempArray = [];

    this.cityService.getCitywithStateWithCountry()
      .subscribe((cityData: any) => {
        cityData.data.forEach((response) => {
          // console.log('API RESPONCE:::', response)
          let tempData = {
            _id: response._id,
            countryName: response.state.country.countryName,
            stateName: response.state.stateName,
            isActive: response.isActive,
            cityName: response.cityName,
            stateId: response.state._id,
            countryId: response.state.country._id,

          }
          // console.log('tempData::', tempData);
          tempArray.push(tempData);
          // console.log('tempArray::', tempArray);
        });

        // console.log('data:::', cityData);
        this.getus = tempArray;
        // console.log('this.getus', this.getus);
        this.dataSource = new MatTableDataSource();
        // console.log('this.dataSource before', this.dataSource);
        this.dataSource.data = tempArray;
        // console.log('this.dataSource after', this.dataSource);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }


  updateCity(updateCity){
    console.log('editData', updateCity);
    this.dialog.open(CityCreateUpdateComponent, { data: { id: updateCity._id, cityName: updateCity.cityName, stateId: updateCity.stateId,countryId: updateCity.countryId } })
    .afterClosed().subscribe((getus: getuser) => {
      if (this.getus) {
        this.getCityWithStateWithCountry();
      }
    });
  }


 


  checkCityStatus(data) {
    console.log(data);
    this.active = !this.active;
    console.log(this.active);
    // console.log('Active:', da);
    let active;
    if (this.active) {
      active = 1;
    } else {
      active = 0;
    }
    this.cityService.checkForCityStatus({ _id: data._id, isActive: active }).subscribe((response: any) => {
      console.log('response', response);
      this.getCityWithStateWithCountry();
    })

  }
}

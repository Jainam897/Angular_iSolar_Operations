import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import icAdd from '@iconify/icons-ic/twotone-add';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StateCreateUpdateComponent } from './state-create-update/state-create-update.component'
import { StateService } from './Interface/state.service';
import { getuser } from './Interface/getuser';
import { ThemePalette } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TableColumn } from '../../../../@vex/interfaces/table-column.interface';
import theme from '../../../../@vex/utils/tailwindcss';
import { MatTableDataSource } from '@angular/material/table';
import icEdit from '@iconify/icons-ic/twotone-edit';
import icDelete from '@iconify/icons-ic/twotone-delete';
import icSearch from '@iconify/icons-ic/twotone-search';
import { FormControl } from '@angular/forms';
import { MatFormFieldDefaultOptions, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';
import { Observable, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MatSelectChange } from '@angular/material/select';
import icMoreHoriz from '@iconify/icons-ic/twotone-more-horiz';


@Component({
  selector: 'vex-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss'],
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
export class StateComponent implements OnInit, AfterViewInit {
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

  @Input()
  columns: TableColumn<getuser>[] = [
    // { label: 'countryName', property: 'text', type: 'text', visible: true },
    // { label: 'stateName', property: 'text', type: 'text', visible: true },
    { label: 'States', property: 'stateName', type: 'text', visible: true },
    { label: 'Countries', property: 'countryName', type: 'text', visible: true },
    { label: 'Status', property: 'isActive', type: 'button', visible: true },
    { label: 'Actions', property: 'actions', type: 'badge', visible: true },

  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  active = false;

  dataSource: MatTableDataSource<any> | null;

  constructor(public dialog: MatDialog, public stateService: StateService) { }

  ngOnInit(): void {
    this.getStateWithCountry();
  }
  openDialog(): void {
    this.dialog.open(StateCreateUpdateComponent).afterClosed().subscribe((getus: getuser) => {
      if (this.getus) {
        // this.getCountry();
        this.getStateWithCountry();
      }
    });
  }

  ngAfterViewInit() {
  }
  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  trackByProperty<T>(index: number, column: TableColumn<T>) {
    return column.property;
  }

  // getStates() {
  //   // console.log('GET COUNTRY');
  //   this.stateService.listStates()
  //     .subscribe((stateData: any) => {
  //       console.log('data:::', stateData);
  //       this.getus = stateData.results;
  //       console.log('this.getus', this.getus);
  //       this.dataSource = new MatTableDataSource();
  //       console.log('this.dataSource before', this.dataSource);
  //       this.dataSource.data = stateData.results;
  //       this.dataSource.paginator = this.paginator;
  //       this.dataSource.sort = this.sort;
  //     });
  // }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  editStateDetails(editDetails) {
    console.log('editData', editDetails);
    this.dialog.open(StateCreateUpdateComponent, { data: { _id: editDetails._id, countryId: editDetails.countryId,countryName: editDetails.countryName } })
    .afterClosed().subscribe((getus: getuser) => {
      if (this.getus) {
        this.getStateWithCountry();
      }
    });
  }

  deleteState(deletaStateData: any) {
    // console.log('from value', this.form.value);
    console.log('this.data', deletaStateData);
    this.stateService.checkForDeleteState({ _id: deletaStateData._id })
      .subscribe((response: any) => {
        console.log(response);
        if (response.status === 1) {
          this.stateService.deleteStateData(deletaStateData._id).subscribe((response: any) => {
            console.log(deletaStateData._id);
            console.log(response.message);
            this.getStateWithCountry();
          });

        }
        else {
          console.log('Not deleted');
          this.getStateWithCountry();
        }
      });
  }

  getStateWithCountry() {
    let tempArray = [];

    this.stateService.getStateWithCountry()
      .subscribe((stateData: any) => {
        stateData.data.forEach((response) => {
          let tempData = {
            _id: response._id,
            countryName: response.country.countryName,
            countryId: response.country._id,
            stateName: response.stateName,
            isActive: response.isActive,
          }
          // console.log('tempData::', tempData);
          tempArray.push(tempData);
          // console.log('tempArray::', tempArray);
        });

        // console.log('data:::', stateData);
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

  checkStateStatus(data) {
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
    this.stateService.checkForStateStatus({ _id: data._id, isActive: active }).subscribe((response: any) => {
      console.log('response', response);
      this.getStateWithCountry();
    })

  }

}

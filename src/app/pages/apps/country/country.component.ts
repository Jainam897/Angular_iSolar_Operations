import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import icAdd from '@iconify/icons-ic/twotone-add';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CountryCreateUpdateComponent } from './country-create-update/country-create-update.component'
import { CountryService } from './Interface/country.service';
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
  selector: 'vex-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
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



export class CountryComponent implements OnInit, AfterViewInit {
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
  // dataSource: MatTableDataSource<getuser> | null;
  searchCtrl = new FormControl();
  subject$: ReplaySubject<getuser[]> = new ReplaySubject<any[]>(1);
  data$: Observable<getuser[]> = this.subject$.asObservable();

  // displayedColumns: ['CountryName'];
  dataSource: MatTableDataSource<any> | null;

  pageSizeOptions: number[] = [5, 10, 20, 50];
  @Input()
  columns: TableColumn<getuser>[] = [
    { label: 'countries', property: 'countryName', type: 'text', visible: true },
    { label: 'Status', property: 'isActive', type: 'button', visible: true },
    { label: 'Actions', property: 'actions', type: 'badge', visible: true },
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  active = false;

  constructor(public dialog: MatDialog, private countryService: CountryService) {
    // console.log('Countructor');
    // console.log('columns', this.columns);
  }



  ngOnInit(): void {
    // console.log('Country Init');
    this.getCountry();
  }
  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }
  openDialog(): void {
    this.dialog.open(CountryCreateUpdateComponent).afterClosed().subscribe((getus: getuser) => {
      if (this.getus) {
        this.getCountry();
      }
    });
  }


  getCountry() {
    // console.log('GET COUNTRY');
    this.countryService.ListCountriesWithdetail()
      .subscribe((data: any) => {
        // console.log('data:::', data);
        this.getus = data.data;
        // console.log('this.getus', this.getus);
        this.dataSource = new MatTableDataSource();
        // console.log('this.dataSource before', this.dataSource);
        console.log('data.results', data.data);
        this.dataSource.data = data.data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });


  }

  ontry() {
    console.log("hello trial");
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }


  editData(editData) {
    console.log('editData', editData);
    this.dialog.open(CountryCreateUpdateComponent, { data: { _id: editData._id } }).afterClosed().subscribe((getus: getuser) => {
      if (this.getus) {
        this.getCountry();
      }
    });
  }


  deleteCountry(deletaCountryData: any) {
    // console.log('from value', this.form.value);
    console.log('this.data', deletaCountryData);
    this.countryService.checkForDeleteCountry({ _id: deletaCountryData._id })
      .subscribe((response: any) => {
        console.log(response);
        if (response.status === 1) {
          this.countryService.deleteCountryData(deletaCountryData._id).subscribe((response: any) => {
            console.log(deletaCountryData._id);
            console.log(response.message);
            this.getCountry();
          });

        }
        else {
          console.log('Not deleted');
          this.getCountry();
        }
      });
  }

  statuscheck(data) {
    console.log('Status CHeck Data', data);
    this.active = !this.active;
    console.log('this.active', this.active);
    // console.log('Active:', da);
    let active;
    if (this.active) {
      active = 1;
    } else {
      active = 0;
    }
    this.countryService.checkForStatus({ _id: data._id, isActive: active }).subscribe((response: any) => {
      console.log('response', response);
      this.getCountry();
    })

  }
  // onChange(event, countryId) {
  //   console.log('event', event);
  //   console.log('countryId', countryId);
  //   this.statuscheck(countryId, event.isActive);
  // }




  trackByProperty<T>(index: number, column: TableColumn<T>) {
    return column.property;
  }

  onLabelChange(change: MatSelectChange, row: getuser) {
    const index = this.getus.findIndex(c => c === row);
    // this.students[index].labels = change.value;
    this.subject$.next(this.getus);
  }

  toggleColumnVisibility(column, event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    column.visible = !column.visible;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}







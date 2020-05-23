import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, of, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Customer } from './interfaces/customer.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TableColumn } from '../../../../@vex/interfaces/table-column.interface';
import { aioTableData, aioTableLabels } from '../../../../static-data/aio-table-data';
import { CustomerCreateUpdateComponent } from './customer-create-update/customer-create-update.component';
import icEdit from '@iconify/icons-ic/twotone-edit';
import icDelete from '@iconify/icons-ic/twotone-delete';
import icSearch from '@iconify/icons-ic/twotone-search';
import icAdd from '@iconify/icons-ic/twotone-add';
import icFilterList from '@iconify/icons-ic/twotone-filter-list';
import { SelectionModel } from '@angular/cdk/collections';
import icMoreHoriz from '@iconify/icons-ic/twotone-more-horiz';
import icFolder from '@iconify/icons-ic/twotone-folder';
import { fadeInUp400ms } from '../../../../@vex/animations/fade-in-up.animation';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { stagger40ms } from '../../../../@vex/animations/stagger.animation';
import { FormControl,FormBuilder, FormGroup, Validators} from '@angular/forms';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { MatSelectChange } from '@angular/material/select';
import theme from '../../../../@vex/utils/tailwindcss';
import icPhone from '@iconify/icons-ic/twotone-phone';
import icMail from '@iconify/icons-ic/twotone-mail';
import icMap from '@iconify/icons-ic/twotone-map';
import { StudentService } from './interfaces/student.service';
import { Students } from './interfaces/students';
import { Router, Params, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'vex-aio-table',
  templateUrl: './aio-table.component.html',
  styleUrls: ['./aio-table.component.scss'],
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
export class AioTableComponent implements OnInit {
  layoutCtrl = new FormControl('boxed');
  subject$: ReplaySubject<Students[]> = new ReplaySubject<Customer[]>(1);
  data$: Observable<Students[]> = this.subject$.asObservable();
  // customers: Customer[];
  students: Students[];
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  labels = aioTableLabels;

  @Input()
  columns: TableColumn<Students>[] = [
    { label: 'Checkbox', property: 'checkbox', type: 'checkbox', visible: true },
    { label: 'First Name', property: 'fname', type: 'text', visible: true },
    { label: 'Last Name', property: 'lname', type: 'text', visible: true },
    { label: 'Gmail', property: 'gmail', type: 'text', visible: true },
    // { label: 'Contact Number', property: 'contact', type: 'text', visible: true },

    // { label: 'Contact', property: 'contact', type: 'button', visible: false },
      // { label: 'Actions', property: 'actions', type: 'button', visible: true }
  ];
  dataSource: MatTableDataSource<Students> | null;
  selection = new SelectionModel<Students>(true, []);
  searchCtrl = new FormControl();
  addForm: FormGroup;


  icPhone = icPhone;
  icMail = icMail;
  icMap = icMap;
  icEdit = icEdit;
  icSearch = icSearch;
  icDelete = icDelete;
  icAdd = icAdd;
  icFilterList = icFilterList;
  icMoreHoriz = icMoreHoriz;
  icFolder = icFolder;

  theme = theme;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  _id: any;
 // dataSource : any;
  // displayedColumns = ['id', 'fname','lname','gmail','Update','Delete'];  
  //dataSource = new MatTableDataSource(this.students);
 

  constructor(private formBuilder: FormBuilder,private _studentsservice: StudentService,private dialog: MatDialog, private router: Router, private routes: ActivatedRoute) { }
 

  // get visibleColumns() {
  //   return this.columns.filter(column => column.visible).map(column => column.property);
  // }

  /**
   * Example on how to get data and pass it to the table - usually you would want a dedicated service with a HTTP request for this
   * We are simulating this request here.
   */
  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }


  
 


  // getData() {
  //   return of(aioTableData.map(student => new Students(student)));
  // }

  ngOnInit() {
    this._studentsservice.getstudents()
    .subscribe((data: Students[]) => {
      console.log('data:::', data);
      this.students = data;
      console.log(this.students);
      this.students = data;  
      this.dataSource=new MatTableDataSource();
      console.log('this.dataSource', this.dataSource);
      this.dataSource.data = data;  
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.dataSource = new MatTableDataSource<Students>();
    console.log('this.dataSource', this.dataSource);
   
    // this.data$.pipe(
    //   filter<Students[]>(Boolean)
    // ).subscribe(customers => {
    //   console.log('customers', customers)
    //   this.students = customers;
    //   this.dataSource.data = customers;
    //   console.log('this.dataSource.data', this.dataSource.data)

    // });

   

    this.addForm = this.formBuilder.group({
      id: [''],
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      gmail: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]]
      // mobile:['',Validators.required]

    });
   
   
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  logdata(row) {
    console.log(row);
  }

  delete(students: Students): void {
    console.log(students.id);
    this._studentsservice.deleteStudent(students.id)
      .subscribe(data => {
        this.students = this.students.filter(u => u !== students);


      });

  }


getstd(){
  this._studentsservice.getstudents()
  .subscribe((data: Students[]) => {
    this.students = data;
    console.log(this.students);
    this.students = data;  
    this.dataSource=new MatTableDataSource();
    this.dataSource.data = data;  
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort = this.sort;
  });
}

  update(students: Students): void {
    this._id = students.id;

   // this.router.navigate(['edit/' + this._id]);

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }


 
  




  createCustomer() {
    this.dialog.open(CustomerCreateUpdateComponent).afterClosed().subscribe((students : Students) => {
      /**
       * Customer is the updated customer (if the user pressed Save - otherwise it's null)
       */
      if (this.students) {
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */

        // this._studentsservice.insertStudent(this.addForm.value)
        // .subscribe(data=>(['']));
    
        this.students.unshift(new Customer(students));
        this.subject$.next(this.students);

        this.getstd();
      }
    });
  }

  updateCustomer(students : Students) {


    // const routeParams = this.routes.snapshot.params;
    // console.log(routeParams.id)

    this._studentsservice.getStudentById(students.id)
      .subscribe((data: any) => {
        console.log(data)

        this.addForm.patchValue(data);
      })
    
    console.log("msg",students);

    this.dialog.open(CustomerCreateUpdateComponent, {
      data: students
    }).afterClosed().subscribe(updatedCustomer => {
      /**
       * Customer is the updated customer (if the user pressed Save - otherwise it's null)
       */
      if (updatedCustomer) {
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */

        // this._studentsservice.updateStudentdata(this.defthis.addForm.value)
        // .subscribe();

        // const students = this.addForm.value;
        //  students.id = this._id;
        // console.log('this.form.value', this.addForm.value)
        // this._studentsservice.updateStudentdata(students.id, this.addForm.value)
        // .subscribe();
        // this.dialogRef.close(students);



        const index = this.students.findIndex((existingStudents) => existingStudents.id === updatedCustomer.id);
        this.students[index] = new Customer(updatedCustomer);
        this.subject$.next(this.students);
      }
    });
  }

  deleteCustomer(students: Students) {
    /**
     * Here we are updating our local array.
     * You would probably make an HTTP request here.
     */
    this._studentsservice.deleteStudent(students.id)
    .subscribe(data => {
      this.students = this.students.filter(u => u !== students);

    this.students.splice(this.students.findIndex((existingStudents) => existingStudents.id === students.id), 1);
    this.selection.deselect(students);
    this.subject$.next(this.students);

     this.getstd();
    });

    
  }

  deleteCustomers(students: Students[]) {
    /**
     * Here we are updating our local array.
     * You would probably make an HTTP request here.
     */

     
    students.forEach(c => this.deleteCustomer(c));
  }

  onFilterChange(value: string) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  toggleColumnVisibility(column, event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    column.visible = !column.visible;
  }

  // /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  // /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  trackByProperty<T>(index: number, column: TableColumn<T>) {
    return column.property;
  }

  onLabelChange(change: MatSelectChange, row: Customer) {
    const index = this.students.findIndex(c => c === row);
    // this.students[index].labels = change.value;
    this.subject$.next(this.students);
  }

  // ngOnDestroy() {
  // }
}

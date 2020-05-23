import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialmoduleModule} from '../../../../../src/app/materialmodule/materialmodule.module'
import { CountryRoutingModule } from './country-routing.module';
import { CountryCreateUpdateComponent } from './country-create-update/country-create-update.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PageLayoutModule } from '../../../../@vex/components/page-layout/page-layout.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { IconModule } from '@visurel/iconify-angular';
import { BreadcrumbsModule } from 'src/@vex/components/breadcrumbs/breadcrumbs.module';
import { CustomerCreateUpdateModule } from '../aio-table/customer-create-update/customer-create-update.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ContainerModule } from 'src/@vex/directives/container/container.module';
import { MatSelectModule } from '@angular/material/select';
import { ColorFadeModule } from 'src/@vex/pipes/color/color-fade.module';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { CountryComponent } from './country.component';

@NgModule({
  declarations: [CountryComponent, CountryCreateUpdateComponent],
  imports: [
    CommonModule,
    CountryRoutingModule,
    MaterialmoduleModule,
    FormsModule,
    ReactiveFormsModule,
    PageLayoutModule,
    FlexLayoutModule,
    IconModule,
    BreadcrumbsModule,
    // CustomerCreateUpdateModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatFormFieldModule,
    MatTooltipModule,
    ContainerModule,
    MatSelectModule,
    ColorFadeModule,
    MatButtonToggleModule,
  ],
})
export class CountryModule { }

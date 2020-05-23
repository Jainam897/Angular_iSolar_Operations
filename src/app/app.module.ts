import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VexModule } from '../@vex/vex.module';
import { HttpClientModule } from '@angular/common/http';
import { CustomLayoutModule } from './custom-layout/custom-layout.module';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialmoduleModule } from './materialmodule/materialmodule.module';
import {uniquedirective} from '../app/pages/apps/aio-table/interfaces/uniquedirective';
import {CountryCreateUpdateComponent} from '../app/pages/apps/country/country-create-update/country-create-update.component';
import { StateCreateUpdateComponent } from './pages/apps/state/state-create-update/state-create-update.component';
import { CityCreateUpdateComponent } from './pages/apps/city/city-create-update/city-create-update.component';


export const routes: Routes = [
  // { path: '', component: ViewComponent, pathMatch: 'full' },
  // { path: 'view', component: ViewComponent },
  // { path: 'add', component: AddComponent },
  // { path: 'edit/:id', component: EditComponent },

];

@NgModule({
  declarations: [AppComponent,uniquedirective],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialmoduleModule,
    

    // Vex
    VexModule,
    CustomLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents : [CountryCreateUpdateComponent,StateCreateUpdateComponent,CityCreateUpdateComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule as AngularCalendarModule, DateAdapter } from 'angular-calendar';
import { CalendarRoutingModule } from './calendar-routing.module';
import { DayViewSchedularComponent } from './day-view-schedular/day-view-schedular.component';
import { CalendarComponent } from './calendar.component';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { MaterialmoduleModule } from 'src/app/materialmodule/materialmodule.module';

ImageBitmap
@NgModule({
  declarations: [CalendarComponent,DayViewSchedularComponent],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    MaterialmoduleModule,
    AngularCalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
   
  ]
})
export class CalendarModule { }

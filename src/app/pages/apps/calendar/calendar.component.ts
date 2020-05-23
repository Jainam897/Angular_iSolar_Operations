import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
} from 'angular-calendar';
import { addHours, startOfDay } from 'date-fns';
import { User } from './day-view-schedular/day-view-schedular.component';
import { colors } from './colors';
import { CalendarService } from './Interface/calendar.service';

// const users: User[] = [
  // {
  //   id: 2,
  //   name: 'pratik patel',
  //   color: colors.red
  // },
  
// ];
@Component({
  selector: 'vex-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class CalendarComponent implements OnInit {
  viewDate = new Date();
  users = [];
  rowData = [];

  constructor(private calendarService: CalendarService) {
    this.calendarService.userList().subscribe((data) => {
      this.users = data;
      console.log('this.users:::::', this.users);
    });

  }
  ngOnInit(): void {

    this.rowData = [];
    this.calendarService.eventList().subscribe((data) => {
      // console.log("Data::::::", data);
      if (data) {
        data.forEach((response, ) => {
          // console.log('response', response);
          // console.log('response.row', response.row);
          response.row.forEach((rowRes) => {
            // console.log('rowRes:::', rowRes);
            const tempData = {
              title: rowRes.event.title,
              color: rowRes.event.color,
              start: new Date(rowRes.event.start),
              meta: rowRes.event.meta,
              resizable: {
                beforeStart: rowRes.startsBeforeWeek,
                afterEnd: rowRes.endsAfterWeek
              },
              draggable: rowRes.event.draggable,
            }
            // console.log('tempData:::::::::', tempData);
            this.events.push(tempData);
          });
        });
      }
      console.log('this.events::::', this.events);
    })
  }

  events: CalendarEvent[] = [];

  // events: CalendarEvent[] = [
  //     {
  //       title: 'A 3rd all day event',
  //       color: users[0].color,
  //       start: new Date(),
  //       meta: {
  //         user: users[0],
  //       },
  //       draggable: true,
  //       allDay: true,
  //     },
  // ];

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.events = [...this.events];
  }

  userChanged({ event, newUser }) {
    event.color = newUser.color;
    event.meta.user = newUser;
    this.events = [...this.events];
  }
}
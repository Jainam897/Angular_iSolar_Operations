import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
} from 'angular-calendar';
import { addHours, startOfDay } from 'date-fns';
import { User } from './day-view-schedular/day-view-schedular.component';
import { colors } from './colors';


const users: User[] = [

  {
    id: 0,
    name: 'Rahul Shah',
    color: colors.yellow
  },

  {
    id: 1,
    name: 'Prkruti Patel',
    color: colors.blue
  },

  {
    id: 2,
    name: 'Hinaxi Patel',
    color: colors.red
  },
];


@Component({
  selector: 'vex-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class CalendarComponent implements OnInit {
  viewDate = new Date();
  users = users;

  constructor() { }
  ngOnInit(): void {
  }

  events: CalendarEvent[] = [
    {
      title: 'An event',
      color: users[0].color,
      start: addHours(startOfDay(new Date()), 5),
      meta: {
        user: users[0],
      },
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      title: 'Another event',
      color: users[1].color,
      start: addHours(startOfDay(new Date()), 2),
      meta: {
        user: users[1],
      },
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },

    {
      title: 'An event',
      color: users[2].color,
      start: addHours(startOfDay(new Date()), 9),
      meta: {
        user: users[2],
      },
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },

    {
      title: 'Another event',
      color: users[2].color,
      start: addHours(startOfDay(new Date()), 16),
      meta: {
        user: users[2],
      },
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },

 {
      title: 'Another event',
      color: users[0].color,
      start: addHours(startOfDay(new Date()), 2),
      meta: {
        user: users[0],
      },
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },

    {
      title: 'A 3rd event',
      color: users[0].color,
      start: addHours(startOfDay(new Date()), 7),
      meta: {
        user: users[0],
      },
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      title: 'An all day event',
      color: users[0].color,
      start: new Date(),
      meta: {
        user: users[0],
      },
      draggable: true,
      allDay: true,
    },
    {
      title: 'Another all day event',
      color: users[1].color,
      start: new Date(),
      meta: {
        user: users[1],
      },
      draggable: true,
      allDay: true,
    },
    {
      title: 'A 3rd all day event',
      color: users[0].color,
      start: new Date(),
      meta: {
        user: users[0],
      },
      draggable: true,
      allDay: true,
    },
  ];

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
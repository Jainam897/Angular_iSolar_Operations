import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../day-view-schedular/day-view-schedular.component';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(public http : HttpClient) { }

  eventList(): Observable<any>{
    return this.http.get<any>('http://www.json-generator.com/api/json/get/cdYdJCGkFu?indent=2');
  }

  userList() : Observable<User[]>{
    return this.http.get<User[]>('http://www.json-generator.com/api/json/get/cpLYQpeKMi?indent=2');
  }
}

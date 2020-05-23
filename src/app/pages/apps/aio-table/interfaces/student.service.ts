import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Students } from './students';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) {
  }

  getstudents() {
    return this.http.get<Students[]>('http://localhost/my-crud-app/list.php');

  }

  deleteStudent(id: number) {
    return this.http.delete<Students[]>('http://localhost/my-crud-app/delete.php?id=' + id);

  }

  insertStudent(students: Students) {
    return this.http.post<Students[]>('http://localhost/my-crud-app/insert.php', students);

  }

  getStudentById(id: number) {
    return this.http.get<Students[]>('http://localhost/my-crud-app/update.php?id=' + id);

  }

  updateStudentdata(id: number, students: Students) {
    return this.http.put('http://localhost/my-crud-app/updatestudentdata.php' + '?id=' + id, students);
  }

  getStudentMail(gmail: string) {
    console.log('gmail service::', gmail);
    return this.http.get<Students[]>('http://localhost/my-crud-app/mail.php?gmail=' + gmail);
  }

}

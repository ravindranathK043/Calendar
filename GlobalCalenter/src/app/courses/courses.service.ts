import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AllCourses } from './all-courses';
import { Courses } from "./courses";

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private url = "https://localhost:44387/api";
  

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }
  GetCourses(): Observable<Courses[]> {
    return this.httpClient.get<Courses[]>(this.url + '/Courses')
      .pipe(
      catchError(this.errorHandler) 
    );
  }
  GetCoursesById(id: number): Observable<Courses> {   
    return this.httpClient.get<Courses>(this.url + '/Courses/' + id)
      .pipe(
        catchError(this.errorHandler)
    );
  }

  createCourses(courses: any): Observable<Courses> {
   
    return this.httpClient.post<Courses>(this.url + '/Courses/', JSON.stringify(courses), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }
  updateCourses(Id: number, courses: any): Observable<Courses> {
    return this.httpClient.put<Courses>(this.url + '/Courses/' + Id, JSON.stringify(courses), this.httpOptions).pipe(catchError(this.errorHandler)
    );
  }

  deleteCourses(id: any) {
    return this.httpClient.delete<Courses>(this.url + '/Courses/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }


  errorHandler(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code:${error.status}\nMessage:${error.message}`;
    }
    return throwError(errorMessage);
    }  
}

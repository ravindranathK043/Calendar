import { ErrorHandler, Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from "@angular/common/http"
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AllCourses } from "./all-courses";

@Injectable({
  providedIn: 'root'
})
export class AllCoursesService {
  private Apiurl = "https://localhost:44387/api";
  constructor(private httpClient: HttpClient) { }

  getAllCourses(): Observable<AllCourses[]> {
    return this.httpClient.get<AllCourses[]>(this.Apiurl + '/AllCourses')
      .pipe(
        catchError(this.errorHandler)
      );
  }

    errorHandler(error: { error: { message: string; }; status: any; message: any; }){
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        errorMessage = error.error.message;
      } else {
        errorMessage = `Error Code:${error.status}\nMessage:${error.message}`;
      }
      return throwError(errorMessage);
    }


}

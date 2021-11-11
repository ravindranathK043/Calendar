import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Userdetail } from './userdetail';

@Injectable({
  providedIn: 'root'
})
export class UserdetailService {

  private Apiurl = "https://localhost:44387/api";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
    header: HttpHeaders | { [header: string]: string | string[]; } | undefined;

  constructor(private httpClient: HttpClient) { }


  getUser(): Observable<Userdetail[]> {
    return this.httpClient.get<Userdetail[]>(this.Apiurl + '/User')
      .pipe(
        catchError(this.errorHandler)
      );
  }
  GetUserId(id: number): Observable<Userdetail> {
    return this.httpClient.get<Userdetail>(this.Apiurl + '/User/' + id)
      .pipe(
        catchError(this.errorHandler)
    );
  }

  login(users: any): Observable<Userdetail> {
    return this.httpClient.post<Userdetail>(this.Apiurl + '/User/', JSON.stringify(users), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }
  loginUser(formData: any) {
    return this.httpClient.post(this.Apiurl + '/User/Login' , formData)
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

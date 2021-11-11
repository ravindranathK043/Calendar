import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Trainer } from './trainer';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {
  private Apiurl = "https://localhost:44387/api";

  constructor(private httpClient: HttpClient) { }
  getTrainer(): Observable<Trainer[]> {
    return this.httpClient.get<Trainer[]>(this.Apiurl + '/Trainer')
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

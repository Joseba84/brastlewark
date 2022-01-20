import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Gnome } from './../models/gnome';

export interface GnomeApiResponse{
  gnomes: Gnome[]
}

@Injectable({
  providedIn: 'root',
})

export class GnomeService {
  dataUrl: string = "https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json";

  constructor(private http: HttpClient) {}

  public getPopulation(): Observable<Gnome[]> {
    return this.http
    .get<Gnome[]>(this.dataUrl)
    .pipe(catchError(this.handleError<Gnome[]>('getPopulation')))
  }

  private handleError<T>(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      console.log(error);

      return throwError({status: error.status, message: error.statusText});
    };
  }
}

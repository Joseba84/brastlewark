import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Gnome } from './../models/gnome';

export interface GnomeApiResponse{
  Brastlewark: Gnome[]
}
@Injectable({
  providedIn: 'root',
})

export class GnomeService {
  dataUrl: string = "https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json";
  private populationData: Gnome[];
  private paginationData: Gnome[][];
  constructor(private http: HttpClient) {}

  public getData(): Observable<GnomeApiResponse> {
    return this.http
    .get<GnomeApiResponse>(this.dataUrl)
    .pipe(catchError(this.handleError<GnomeApiResponse>('getPopulation')))
  }

  public setPopulationData(data: Gnome[]) {
    this.populationData = data;
  }

  public getPaginationData(): Gnome[][] {
    return this.paginationData;
  }

  public setPaginationData(size: number) {
    this.paginationData = this.chunkData(size);
  }

  public chunkData (size: number): Gnome[][] {
    const data = this.populationData;
    const chunkData = [];
    for (var index = 0; index < data.length; index += size) {
      chunkData.push(data.slice(index, index + size));
    }
    return chunkData || [];
  }

  private handleError<T>(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);

      return throwError({status: error.status, message: error.statusText});
    };
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, filter } from 'rxjs/operators';
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

  public chunkData (size: number, data?: Gnome[]): Gnome[][] {
    const population = data || this.populationData.slice();
    const chunkData = [];
    for (var index = 0; index < population.length; index += size) {
      chunkData.push(population.slice(index, index + size));
    }
    return chunkData || [];
  }

  public filterData(term: string, size: number, orderBy?: string) {
    const data = this.populationData;
    let filteredData: Gnome[] = data.filter((i) =>
    i.name.toLowerCase().indexOf(term.toLowerCase()) > -1 ||
    i.age.toString().indexOf(term.toLowerCase()) > -1);

    filteredData = orderBy ? this.getDataFilters(filteredData, orderBy): filteredData;

    this.paginationData = term.length >= 0 ? this.chunkData(size, filteredData): this.chunkData(size);
  }

  public getDataFilters(data: Gnome[], orderBy: string): any {
    let dataOrderBy: Gnome[];
    dataOrderBy = data.sort((a, b) => (a[orderBy] > b[orderBy]) ? 1 : ((b[orderBy] > a[orderBy]) ? -1 : 0))

    return dataOrderBy;
  }

  private handleError<T>(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);

      return throwError({status: error.status, message: error.statusText});
    };
  }
}

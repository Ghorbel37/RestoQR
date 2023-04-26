import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Table } from '../model/table';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TablesService {

  private endpoint = 'tables';

  constructor(private httpClient: HttpClient) { }

  // getAll(): Observable<Categorie[]> {
  //   return this.httpClient.get<Categorie[]>(`${environment.apiUrl}${this.endpoint}`);
  // }

  // save(dto: Categorie): Observable<Object> {
  //   return this.httpClient.post(`${environment.apiUrl}${this.endpoint}`, dto);
  // }

  // getById(id: number): Observable<Categorie> {
  //   return this.httpClient.get<Categorie>(`${environment.apiUrl}${this.endpoint}/${id}`);
  // }

  getByNumero(numero: number): Observable<Table> {
    return this.httpClient.get<Table>(`${environment.apiUrl}${this.endpoint}/numero/${numero}`);
  }

  updateTables(nbrTables: number): Observable<Object> {
    return this.httpClient.post(`${environment.apiUrl}${this.endpoint}/multiple`, nbrTables)
  }
}

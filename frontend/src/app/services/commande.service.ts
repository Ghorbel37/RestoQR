import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  private endpoint = 'commande';

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
}

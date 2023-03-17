import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SousCategorie } from '../model/sous-categorie';

@Injectable({
  providedIn: 'root'
})
export class SousCategorieService {

  private baseUrl = 'http://localhost:9090/api/sous_categories';

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<SousCategorie[]> {
    return this.httpClient.get<SousCategorie[]>(`${this.baseUrl}`);
  }

  save(dto: SousCategorie): Observable<Object> {
    return this.httpClient.post(`${this.baseUrl}`, dto);
  }

  getById(id: number): Observable<SousCategorie> {
    return this.httpClient.get<SousCategorie>(`${this.baseUrl}/${id}`);
  }

  update(id: number, dto: SousCategorie): Observable<Object> {
    return this.httpClient.put(`${this.baseUrl}/${id}`, dto);
  }

  delete(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }
}

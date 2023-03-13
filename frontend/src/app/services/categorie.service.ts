import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categorie } from '../model/categorie';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  private baseUrl = 'http://localhost:9090/api/categories';

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Categorie[]> {
    return this.httpClient.get<Categorie[]>(`${this.baseUrl}`);
  }

  add(dto: Categorie): Observable<Object> {
    return this.httpClient.post(`${this.baseUrl}`, dto);
  }

  getById(id: number): Observable<Categorie> {
    return this.httpClient.get<Categorie>(`${this.baseUrl}/${id}`);
  }

  update(id: number, dto: Categorie): Observable<Object> {
    return this.httpClient.put(`${this.baseUrl}/${id}`, dto);
  }

  delete(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }
}

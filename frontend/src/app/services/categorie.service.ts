import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Categorie } from '../model/categorie';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  private endpoint = 'categories';

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Categorie[]> {
    return this.httpClient.get<Categorie[]>(`${environment.apiUrl}${this.endpoint}`);
  }

  save(dto: Categorie): Observable<Object> {
    return this.httpClient.post(`${environment.apiUrl}${this.endpoint}`, dto);
  }

  getById(id: number): Observable<Categorie> {
    return this.httpClient.get<Categorie>(`${environment.apiUrl}${this.endpoint}/${id}`);
  }

  update(id: number, dto: Categorie): Observable<Object> {
    return this.httpClient.put(`${environment.apiUrl}${this.endpoint}/${id}`, dto);
  }

  delete(id: number): Observable<Object> {
    return this.httpClient.delete(`${environment.apiUrl}${this.endpoint}/${id}`);
  }
}

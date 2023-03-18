import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { SousCategorie } from '../model/sous-categorie';

@Injectable({
  providedIn: 'root'
})
export class SousCategorieService {

  private endpoint = 'sous_categories';

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<SousCategorie[]> {
    return this.httpClient.get<SousCategorie[]>(`${environment.apiUrl}${this.endpoint}`);
  }

  save(dto: SousCategorie): Observable<Object> {
    return this.httpClient.post(`${environment.apiUrl}${this.endpoint}`, dto);
  }

  getById(id: number): Observable<SousCategorie> {
    return this.httpClient.get<SousCategorie>(`${environment.apiUrl}${this.endpoint}/${id}`);
  }

  update(id: number, dto: SousCategorie): Observable<Object> {
    return this.httpClient.put(`${environment.apiUrl}${this.endpoint}/${id}`, dto);
  }

  delete(id: number): Observable<Object> {
    return this.httpClient.delete(`${environment.apiUrl}${this.endpoint}/${id}`);
  }
}

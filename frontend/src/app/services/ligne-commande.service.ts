import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LigneCommande } from '../model/ligne-commande';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LigneCommandeService {
  private endpoint = 'ligneCommandes';

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<LigneCommande[]> {
    return this.httpClient.get<LigneCommande[]>(`${environment.apiUrl}${this.endpoint}`);
  }

  save(dto: LigneCommande): Observable<Object> {
    return this.httpClient.post(`${environment.apiUrl}${this.endpoint}`, dto);
  }

  saveAll(dto: LigneCommande[]): Observable<LigneCommande[]> {
    return this.httpClient.post<LigneCommande[]>(`${environment.apiUrl}${this.endpoint}/multiple`, dto);
  }

  getById(id: number): Observable<LigneCommande> {
    return this.httpClient.get<LigneCommande>(`${environment.apiUrl}${this.endpoint}/${id}`);
  }

  update(id: number, dto: LigneCommande): Observable<Object> {
    return this.httpClient.put(`${environment.apiUrl}${this.endpoint}/${id}`, dto);
  }

  delete(id: number): Observable<Object> {
    return this.httpClient.delete(`${environment.apiUrl}${this.endpoint}/${id}`);
  }
}

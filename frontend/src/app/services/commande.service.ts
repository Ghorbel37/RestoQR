import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Commande } from '../model/commande';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  private endpoint = 'commandes';

  constructor(private httpClient: HttpClient) { }

  // getAll(): Observable<Categorie[]> {
  //   return this.httpClient.get<Categorie[]>(`${environment.apiUrl}${this.endpoint}`);
  // }

  save(dto: Commande): Observable<Object> {
    return this.httpClient.post(`${environment.apiUrl}${this.endpoint}`, dto);
  }

  getById(id: number): Observable<Commande> {
    return this.httpClient.get<Commande>(`${environment.apiUrl}${this.endpoint}/${id}`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Restaurant } from '../model/restaurant';
import { Categorie } from '../model/categorie';
import { Table } from '../model/table';
import { LigneCommande } from '../model/ligne-commande';
import { Commande } from '../model/commande';
import { Article } from '../model/article';
import { Client } from '../model/client';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private endpoint = 'menu';

  constructor(private httpClient: HttpClient) { }

  getRestaurant(): Observable<Restaurant> {
    return this.httpClient.get<Restaurant>(`${environment.apiUrl}${this.endpoint}/restaurant`);
  }

  getCategories(): Observable<Categorie[]> {
    return this.httpClient.get<Categorie[]>(`${environment.apiUrl}${this.endpoint}/categories`);
  }

  getArticlesActifs(): Observable<Article[]> {
    return this.httpClient.get<Article[]>(`${environment.apiUrl}${this.endpoint}/articles`);
  }

  getTableById(id: number): Observable<Table> {
    return this.httpClient.get<Table>(`${environment.apiUrl}${this.endpoint}/table/id/${id}`);
  }

  getTableByNumero(numero: number): Observable<Table> {
    return this.httpClient.get<Table>(`${environment.apiUrl}${this.endpoint}/table/numero/${numero}`);
  }

  saveCommande(dto: Commande): Observable<Commande> {
    return this.httpClient.post<Commande>(`${environment.apiUrl}${this.endpoint}/commande`, dto);
  }

  saveAllLigneCommandes(dto: LigneCommande[]): Observable<LigneCommande[]> {
    return this.httpClient.post<LigneCommande[]>(`${environment.apiUrl}${this.endpoint}/ligneCommandes/saveAll`, dto);
  }

  getClientByName(name: string): Observable<Client> {
    return this.httpClient.get<Client>(`${environment.apiUrl}${this.endpoint}/name/${name}`);
  }
}
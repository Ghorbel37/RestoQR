import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Article, Categorie } from '../model/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private endpoint = 'articles';
  private categories = 'categories';

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Article[]> {
    return this.httpClient.get<Article[]>(`${environment.apiUrl}${this.endpoint}`);
  }

  getAllCategories(): Observable<Categorie[]> {
    return this.httpClient.get<Categorie[]>(`${environment.apiUrl}categories`)
  }

  save(dto: Article): Observable<Object> {
    return this.httpClient.post(`${environment.apiUrl}${this.endpoint}`, dto);
  }

  getById(id: number): Observable<Article> {
    return this.httpClient.get<Article>(`${environment.apiUrl}${this.endpoint}/${id}`);
  }

  update(id: number, dto: Article): Observable<Object> {
    return this.httpClient.put(`${environment.apiUrl}${this.endpoint}/${id}`, dto);
  }

  delete(id: number): Observable<Object> {
    return this.httpClient.delete(`${environment.apiUrl}${this.endpoint}/${id}`);
  }
}

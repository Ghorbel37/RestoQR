import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../model/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private baseUrl = 'http://localhost:9090/api/articles';

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Article[]> {
    return this.httpClient.get<Article[]>(`${this.baseUrl}`);
  }

  save(dto: Article): Observable<Object> {
    return this.httpClient.post(`${this.baseUrl}`, dto);
  }

  getById(id: number): Observable<Article> {
    return this.httpClient.get<Article>(`${this.baseUrl}/${id}`);
  }

  update(id: number, dto: Article): Observable<Object> {
    return this.httpClient.put(`${this.baseUrl}/${id}`, dto);
  }

  delete(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }
}

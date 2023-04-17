import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Restaurant } from '../model/restaurant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private endpoint = 'restaurant';

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Restaurant[]> {
    return this.httpClient.get<Restaurant[]>(`${environment.apiUrl}${this.endpoint}`);
  }

  save(dto: Restaurant): Observable<Object> {
    return this.httpClient.post(`${environment.apiUrl}${this.endpoint}`, dto);
  }

  getById(id: number): Observable<Restaurant> {
    return this.httpClient.get<Restaurant>(`${environment.apiUrl}${this.endpoint}/${id}`);
  }

  update(id: number, dto: Restaurant): Observable<Object> {
    return this.httpClient.put(`${environment.apiUrl}${this.endpoint}/${id}`, dto);
  }

  delete(id: number): Observable<Object> {
    return this.httpClient.delete(`${environment.apiUrl}${this.endpoint}/${id}`);
  }
}

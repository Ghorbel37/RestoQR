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

  getRestaurant(): Observable<Restaurant> {
    return this.httpClient.get<Restaurant>(`${environment.apiUrl}${this.endpoint}`);
  }

  update(dto: Restaurant): Observable<Object> {
    return this.httpClient.put(`${environment.apiUrl}${this.endpoint}`, dto);
  }


}

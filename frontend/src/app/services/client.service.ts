import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../model/client';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private endpoint = 'clients';

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Client[]> {
    return this.httpClient.get<Client[]>(`${environment.apiUrl}${this.endpoint}`);
  }

  save(dto: Client): Observable<Object> {
    return this.httpClient.post(`${environment.apiUrl}${this.endpoint}`, dto);
  }

  getById(id: number): Observable<Client> {
    return this.httpClient.get<Client>(`${environment.apiUrl}${this.endpoint}/${id}`);
  }

  update(id: number, dto: Client): Observable<Object> {
    return this.httpClient.put(`${environment.apiUrl}${this.endpoint}/${id}`, dto);
  }

  delete(id: number): Observable<Object> {
    return this.httpClient.delete(`${environment.apiUrl}${this.endpoint}/${id}`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employe } from '../model/employe';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {
  private endpoint = 'employes';

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Employe[]> {
    return this.httpClient.get<Employe[]>(`${environment.apiUrl}${this.endpoint}`);
  }

  save(dto: Employe): Observable<Object> {
    return this.httpClient.post(`${environment.apiUrl}${this.endpoint}`, dto);
  }

  getById(id: number): Observable<Employe> {
    return this.httpClient.get<Employe>(`${environment.apiUrl}${this.endpoint}/${id}`);
  }

  update(id: number, dto: Employe): Observable<Object> {
    return this.httpClient.put(`${environment.apiUrl}${this.endpoint}/${id}`, dto);
  }

  delete(id: number): Observable<Object> {
    return this.httpClient.delete(`${environment.apiUrl}${this.endpoint}/${id}`);
  }
}

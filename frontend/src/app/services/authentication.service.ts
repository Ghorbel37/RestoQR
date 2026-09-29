import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private endpoint = 'auth';

  constructor(private http: HttpClient) {
  }

  login(email: string, password: string): Observable<any> {
    localStorage.removeItem("id_token");
    return this.http.post(`${environment.apiUrl}${this.endpoint}/login`, { email, password }, { responseType: 'text' });
  }

  setSession(token: string): boolean {
    const decodedToken = jwt_decode(token);
    const roles = decodedToken["iss"].slice(1, -1).split(",") as string[];
    if (roles.includes('ROLE_ADMIN')) {
      localStorage.setItem('is_admin', 'true');
      localStorage.setItem('id_token', token);
      localStorage.setItem('expires_at', decodedToken["exp"]);
      localStorage.setItem('subscriber', decodedToken["sub"]);
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("is_admin");
    localStorage.removeItem("subscriber");
  }

  public isLoggedIn(): boolean {
    return localStorage.getItem("id_token") != null && moment().isBefore(this.getExpiration());
  }


  isLoggedOut() {
    return !this.isLoggedIn();
  }

  public isAdmin(): boolean {
    return localStorage.getItem("is_admin") == "true";
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment.unix(expiresAt);
  }
}

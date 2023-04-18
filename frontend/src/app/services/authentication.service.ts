import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import * as moment from 'moment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private endpoint = 'auth';

  constructor(private http: HttpClient) {
  }

  login(email: string, password: string) {
    localStorage.removeItem("id_token");
    this.http.post(`${environment.apiUrl}${this.endpoint}/login`, { email, password }, { responseType: 'text' }).subscribe(res => {
      this.setSession(res);
      console.log('connected succesfully');
    }
    );
  }

  login2(email: string, password: string): Observable<any> {
    localStorage.removeItem("id_token");
    return this.http.post(`${environment.apiUrl}${this.endpoint}/login`, { email, password }, { responseType: 'text' });
  }

  setSession(authResult: string) {
    localStorage.setItem('id_token', authResult);
    console.log("jwt token set");
  }
  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }

  public isLoggedIn(): boolean {
    return localStorage.getItem("id_token") != null //&& moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}

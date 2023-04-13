import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import * as moment from 'moment';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private endpoint = 'auth';

  constructor(private http: HttpClient) {
  }

  login(email: string, password: string): Boolean {
    var login: Boolean = false;
    localStorage.removeItem("id_token");
    this.http.post(`${environment.apiUrl}${this.endpoint}/login`, { email, password }, { responseType: 'text' }).subscribe(res => {
      this.setSession(res);
      login = true;
      console.log('connected succesfully');
    }
    );
    return login;
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

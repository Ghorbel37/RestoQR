import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const idToken = localStorage.getItem("id_token");
    // console.log(idToken);

    if (idToken) {
      // console.log("idToken");
      const authReq = req.clone({
        setHeaders: { "Authorization": "Bearer " + idToken }
        // headers: req.headers.set("Authorization", "Bearer " + idToken)
      });
      console.log(authReq);
      return next.handle(authReq);
    }
    else {
      return next.handle(req);
    }
  }
}

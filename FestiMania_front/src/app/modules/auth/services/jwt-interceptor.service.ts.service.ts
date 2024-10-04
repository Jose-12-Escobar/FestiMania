import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionStorageService } from './session-storage.service';
import { NO_API_KEY } from '../http.contex';
import { EncodeService } from './encode.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorServiceTsService implements HttpInterceptor {

  _sessionStorage = inject(SessionStorageService);
  _encode = inject(EncodeService);
  _router = inject(Router);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let token: string = "";
    const userEncode = this._sessionStorage.getItem('usuario');

    if (userEncode) {
      token = (JSON.parse(this._encode.decodeData(userEncode))).token;
    }

    if (req.context.get(NO_API_KEY)) {
      return next.handle(req);
    } else if (!req.context.get(NO_API_KEY) && token === "") {
      this._router.navigate(['/auth/login']);
    }

    if (token != "") {
      req = req.clone(
        {
          setHeaders: {
            'Content-Type': 'application/json;charset=utf-8',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      )
    }
    return next.handle(req);
  }
}

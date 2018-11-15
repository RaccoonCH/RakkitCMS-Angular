import { Api } from '../api.service'
import { Observable } from 'rxjs'
import { HttpRequest, HttpHandler, HttpInterceptor, HttpEvent } from '@angular/common/http'
import { Injectable } from '@angular/core'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private _api: Api
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this._api.JwtToken) {
      const newReq = req.clone({
        setHeaders: { 'Authorization': this._api.JwtToken }
      })
      return next.handle(newReq)
    }
    return next.handle(req)
  }
}

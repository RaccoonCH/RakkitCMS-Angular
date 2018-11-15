import { Api } from '../api.service';
import { Observable } from 'rxjs'
import { HttpRequest, HttpHandler, HttpInterceptor, HttpEvent } from '@angular/common/http'
import { Injectable } from '@angular/core';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  constructor(
    private _api: Api
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this._api.RestEndpoint && this._api.GraphqlUri !== req.url) {
      const newReq = req.clone({
        url: `${this._api.RestUri}${req.url}`
      })
      return next.handle(newReq)
    }
    return next.handle(req)
  }
}

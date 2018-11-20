import { IRakkitPackage } from './../types/IRakkitPackage';
import { Api } from './api/api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import gql from 'graphql-tag';
import { of, Subject } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class RakkitApiService {
  constructor(
    private _api: Api
  ) { }

  private _selectedRp: IRakkitPackage = null
  private _selectedRpSubject: Subject<IRakkitPackage> = new Subject()

  get SelectedRpSubject() {
    return this._selectedRpSubject
  }
  set SelectedRp(val: IRakkitPackage) {
    this._selectedRp = val
    this.SelectedRpSubject.next(val)
  }
  get SelectedRp() {
    return this._selectedRp
  }

  getRps() {
    return this._api.RestClient.get<IRakkitPackage[]>('/')
  }

  query(query: string, options: { attrs: string[] }) {
    return this._api.GraphqlClient.query({
      query: gql`
        query {
          ${query} {
            ${options.attrs.join(',')}
          }
        }
      `,
    }).pipe(map(({data}) => data[query]))
  }
}

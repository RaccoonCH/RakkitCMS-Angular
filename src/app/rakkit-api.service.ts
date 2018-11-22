import { IRakkitPackage } from './../types/IRakkitPackage'
import { Api } from './api/api.service'
import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { map } from 'rxjs/operators'
import { RakkitPackage } from 'src/types/RakkitPackage'

@Injectable({
  providedIn: 'root'
})
export class RakkitApiService {
  constructor(
    private _api: Api
  ) { }

  private _selectedRp: RakkitPackage = null
  private _selectedRpSubject: Subject<RakkitPackage> = new Subject()

  get SelectedRpSubject() {
    return this._selectedRpSubject
  }
  set SelectedRp(val: RakkitPackage) {
    this._selectedRp = val
    this.SelectedRpSubject.next(val)
  }
  get SelectedRp() {
    return this._selectedRp
  }

  getRps() {
    return this._api.RestClient.get<IRakkitPackage[]>('/').pipe(
      map((value) => {
        return value.map(rp => new RakkitPackage(rp))
      })
    )
  }

  queryMain(rakkitPackage: RakkitPackage) {
    return this._api.GraphqlClient.query({
      query: rakkitPackage.MainQuery
    }).pipe(
      map(
        ({data}) => {
          return data[rakkitPackage.mainQueryRoute].map((rp: Object) => {
            return Object.getOwnPropertyNames(rp).reduce((finalRp: Object, prop: string) => {
              const modelMatch = rakkitPackage.attributes.find((attr) => attr.name === prop)
              let value = rp[prop]
              switch (modelMatch.type.name) {
                case 'object':
                  value = rp[prop][modelMatch.propertyToShow]
                  break
                case 'password':
                  value = modelMatch.maskText
                  break
              }
              finalRp[prop] = value
              return finalRp
            }, {})
          })
        }
      )
    )
  }
}

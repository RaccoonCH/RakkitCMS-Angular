import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  private _selectedRpSubject: Subject<Object> = new Subject()

  get RpInstanceSubject() {
    return this._selectedRpSubject
  }

  constructor() { }
}

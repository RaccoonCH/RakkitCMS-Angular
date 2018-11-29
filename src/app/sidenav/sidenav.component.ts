import { Component } from '@angular/core'
import { SidenavService } from '../sidenav.service'
import { Sheet } from '../../types'

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.sass']
})
export class SidenavComponent {
  private _sheets: Array<Sheet> = []

  constructor(
    private _sidenavService: SidenavService
  ) {
    _sidenavService.RpInstanceSubject.subscribe((selectedRpInstance: Object) => {
      this.addSheet(selectedRpInstance)
    })
  }

  public get IsEmpty() {
    if (this._sheets.length <= 0) {
      return true
    }
    if (this._sheets.length === 1 && this._sheets[0].Leaving === true) {
      return true
    }
    return false
  }

  async closeLastSheet() {
    const index = this._sheets.length - 1
    const lastSheet = this._sheets[index]
    const beforeLastSheet = this._sheets[index - 1]
    if ((beforeLastSheet && !beforeLastSheet.Disabling) || !beforeLastSheet) {
      await Promise.all([
        lastSheet.close(),
        this._sheets.length > 1 && beforeLastSheet.enable()
      ])
      this._sheets.splice(index, 1)
    }
  }

  addSheet(rp: Object) {
    const sheetBefore = this._sheets[this._sheets.length - 1]
    if (sheetBefore) {
      sheetBefore.disable()
    }

    const newSheet = new Sheet(rp)
    this._sheets.push(newSheet)
    newSheet.open()
  }

  private stringify(obj: Object) {
    return JSON.stringify(obj)
  }
}

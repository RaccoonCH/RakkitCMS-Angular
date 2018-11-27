import { Component, Input } from '@angular/core'
import { SidenavService } from '../sidenav.service'
import { Sheet } from '../../types'

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.sass']
})
export class SidenavComponent {
  private _sheets: Array<Sheet> = []
  private _animationDuration = 400

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
    if (this._sheets.length === 1 && this._sheets[0].leaving === true) {
      return true
    }
    return false
  }

  closeLastSheet() {
    const index = this._sheets.length - 1
    const lastSheet = this._sheets[index]
    const beforeLastSheet = this._sheets[index - 1]
    if ((beforeLastSheet && !beforeLastSheet.disabling) || !beforeLastSheet) {
      lastSheet.right = true
      lastSheet.leaving = true

      if (this._sheets.length > 1) {
        beforeLastSheet.active = true
      }

      setTimeout(() => {
        this._sheets.splice(index, 1)
      }, this._animationDuration)
    }
  }

  addSheet(rp: Object) {
    const sheetBefore = this._sheets[this._sheets.length - 1]
    if (sheetBefore) {
      sheetBefore.active = false
      sheetBefore.disabling = true
    }

    const newSheet = {
      active: true,
      right: true,
      entering: true,
      leaving: false,
      disabling: false,
      rp
    }

    this._sheets.push(newSheet)

    setTimeout(() => {
      newSheet.right = false
    })

    setTimeout(() => {
      newSheet.entering = false
      if (sheetBefore) {
        sheetBefore.disabling = false
      }
    }, this._animationDuration)
  }

  private getStyle(sheet: Sheet) {
    return {
      transition: `all ${this._animationDuration}ms`,
      ...(sheet.active && sheet.right ? { right: '-100%' } : {})
    }
  }

  private stringify(obj: Object) {
    return JSON.stringify(obj)
  }
}

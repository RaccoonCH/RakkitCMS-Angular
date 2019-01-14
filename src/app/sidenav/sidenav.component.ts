import { Component } from '@angular/core'
import { SidenavService } from '../sidenav.service'
import { Sheet } from '../../types'

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.sass']
})
export class SidenavComponent {
  private _sheets: Array<Sheet> = [ new Sheet() ]

  constructor(
    private _sidenavService: SidenavService
  ) {
    _sidenavService.RpInstanceSubject.subscribe((selectedRpInstance: Object) => {
      this.addSheet(selectedRpInstance)
    })
  }

  public get TempSheet() {
    return this._sheets[this._sheets.length - 1]
  }

  public get LastSheet() {
    return this._sheets[this._sheets.length - 2]
  }

  public get BeforeLastSheet() {
    return this._sheets[this._sheets.length - 3]
  }

  public get IsEmpty() {
    return this._sheets.filter(s => s.Active).length <= 0
  }

  async closeLastSheet() {
    if ((this.BeforeLastSheet && !this.BeforeLastSheet.Disabling) || !this.BeforeLastSheet) {
      await Promise.all([
        this.LastSheet.close(),
        this.BeforeLastSheet && this.BeforeLastSheet.enable()
      ])
      this._sheets.splice(this._sheets.indexOf(this.LastSheet), 1)
    }
  }

  addSheet(rp: Object) {
    if (this.LastSheet) {
      this.LastSheet.disable()
    }
    this.TempSheet.open(rp)
    this._sheets.push(new Sheet())
  }

  private stringify(obj: Object) {
    return JSON.stringify(obj)
  }
}

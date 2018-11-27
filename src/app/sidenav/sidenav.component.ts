import { Component, Input } from '@angular/core'
import { SidenavService } from '../sidenav.service'
import { Sheet } from '../../types'

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.sass']
})
export class SidenavComponent {
  @Input() private sns: Array<Sheet> = []

  constructor(
    private _sidenavService: SidenavService
  ) {
    _sidenavService.RpInstanceSubject.subscribe((selectedRpInstance: Object) => {
      this.addSheet(selectedRpInstance)
    })
  }

  addSheet(rp: Object) {
    if (this.sns.length > 0) {
      this.sns[this.sns.length - 1].active = false
    }
    this.sns.push({
      active: true,
      right: true,
      rp
    })
    setTimeout(() => {
      this.sns[this.sns.length - 1].right = false
    })
  }

  closeSheet(index) {
    this.sns[index].right = true
    if (this.sns.length > 1) {
      this.sns[index - 1].active = true
    }
    setTimeout(() => {
      this.sns.splice(index, 1)
      console.log(this.sns)
    }, 200)
  }

  private stringify(obj: Object) {
    return JSON.stringify(obj)
  }
}

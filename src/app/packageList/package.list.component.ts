import { Component } from '@angular/core'
import { RakkitPackage } from 'src/types'
import { RakkitApiService } from '../rakkit-api.service'

@Component({
  selector: 'app-package-list',
  templateUrl: './package.list.component.html',
  styleUrls: ['./package.list.component.sass']
})
export class PackageListComponent {
  public _rps: RakkitPackage[]

  constructor(
    private _rakkitApiService: RakkitApiService
  ) {
    this._rakkitApiService.getRps().subscribe((data) => {
      this._rps = data
    })
  }

  onClick(rp: RakkitPackage) {
    this._rakkitApiService.SelectedRp = rp
  }
}

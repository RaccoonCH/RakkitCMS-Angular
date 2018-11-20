import { Component } from '@angular/core'
import { IRakkitPackage } from 'src/types/IRakkitPackage'
import { RakkitApiService } from '../rakkit-api.service'

@Component({
  selector: 'app-package-list',
  templateUrl: './package.list.component.html',
  styleUrls: ['./package.list.component.sass']
})
export class PackageListComponent {
  public _rps: IRakkitPackage[]

  constructor(
    private _rakkitApiService: RakkitApiService
  ) {
    this._rakkitApiService.getRps().subscribe((data) => {
      this._rps = data
    })
  }

  onClick(rp: IRakkitPackage) {
    this._rakkitApiService.SelectedRp = rp
  }
}

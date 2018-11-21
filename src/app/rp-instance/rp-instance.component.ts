import { Component, OnInit, ViewChild } from '@angular/core'
import { RakkitApiService } from '../rakkit-api.service'
import { MatSort, MatTableDataSource } from '@angular/material'
import { RakkitPackage } from '../../types'

@Component({
  selector: 'app-rp-instance',
  templateUrl: './rp-instance.component.html',
  styleUrls: ['./rp-instance.component.sass']
})
export class RpInstanceComponent implements OnInit {
  private _selectedRp: RakkitPackage
  private _rpDataSource: MatTableDataSource<Object> = new MatTableDataSource([])
  @ViewChild(MatSort) sort: MatSort

  public get RpInstances() {
    return this._rpDataSource.data
  }
  public set RpInstances(val: Object[]) {
    this._rpDataSource.data = val
  }

  public get RpDataSource() {
    return this._rpDataSource
  }

  public get SelectedRpAttributes() {
    if (this._selectedRp) {
      return this._selectedRp.attributes.filter((attr) => {
        return attr.isInHeader && attr.type.name !== 'password'
      }).map((attr) => {
        return attr.name
      })
    }
    return []
  }

  constructor(
    private _rakkitApiService: RakkitApiService
  ) {
    _rakkitApiService.SelectedRpSubject.subscribe((data) => {
      this._selectedRp = data
      this.RpInstances = []
      this.get().subscribe((res) => {
        this.RpInstances = res
      })
    })
  }

  ngOnInit() {
    this._rpDataSource.sort = this.sort
  }

  get() {
    return this._rakkitApiService.queryMain(this._selectedRp)
  }
}

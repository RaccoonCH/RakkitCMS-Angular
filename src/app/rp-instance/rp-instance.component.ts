import { Component, OnInit, ViewChild } from '@angular/core'
import { RakkitApiService } from '../rakkit-api.service'
import { MatSort, MatTableDataSource, PageEvent } from '@angular/material'
import { RakkitPackage } from '../../types'
import { RpInstanceResponse } from 'src/types/RakkitApi'

@Component({
  selector: 'app-rp-instance',
  templateUrl: './rp-instance.component.html',
  styleUrls: ['./rp-instance.component.sass']
})
export class RpInstanceComponent implements OnInit {
  @ViewChild(MatSort)
  private _sort: MatSort
  private _selectedRp: RakkitPackage
  private _rpDataSource: MatTableDataSource<Object> = new MatTableDataSource([])
  private _itemsPerPage = 10
  private _pageIndex = 0
  private _numbersOfItemsPerPage = [10, 25, 50, 100]
  private _initialNOIPPLenght = 0
  private _totalItems = 0

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
    this._initialNOIPPLenght = this._numbersOfItemsPerPage.length
    this._rakkitApiService.SelectedRpSubject.subscribe((newSelectedRp) => {
      if (this._selectedRp !== newSelectedRp) {
        this._selectedRp = newSelectedRp
        this.RpInstances = []
        this.getItems()
      }
    })
  }

  public ngOnInit() {
    this._rpDataSource.sort = this._sort
  }

  private getItems() {
    return this._rakkitApiService.queryMain(this._selectedRp, this._pageIndex, this._itemsPerPage).subscribe((res: RpInstanceResponse) => {
      this.RpInstances = res.items
      this._totalItems = res.count
    })
  }

  private pageUpdate(event: PageEvent) {
    this._pageIndex = event.pageIndex
    this._itemsPerPage = event.pageSize
    this.getItems()
  }
}

import { NgModule } from '@angular/core'
import {
  MatTabsModule,
  MatToolbarModule,
  MatListModule,
  MatButtonModule,
  MatSidenavModule,
  MatTableModule,
  MatSortModule
} from '@angular/material'
import {CdkTableModule} from '@angular/cdk/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
// import { NoopAnimationsModule } from '@angular/platform-browser/animations'

@NgModule({
  imports: [
    MatTabsModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    // NoopAnimationsModule
  ],
  exports: [
    MatTabsModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatSidenavModule,
    MatTableModule,
    MatSortModule,
    CdkTableModule
  ]
})
export class MaterialModule { }

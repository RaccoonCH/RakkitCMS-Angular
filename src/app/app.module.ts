import { ApiModule } from './api/api.module'
import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { MaterialModule } from './material.module'
import { PackageListComponent } from './package-list/package-list.component'
import { RpInstancesComponent } from './rp-instances/rp-instances.component'
import { SidenavComponent } from './sidenav/sidenav.component'

@NgModule({
  declarations: [
    AppComponent,
    PackageListComponent,
    RpInstancesComponent,
    SidenavComponent
  ],
  imports: [
    ApiModule.forRoot({
      graphqlEndpoint: 'gql',
      restEndpoint: 'rest',
      baseUrl: 'http://localhost:4000',
      fetchPolicy: 'network-only'
    }),
    BrowserModule,
    AppRoutingModule,
    MaterialModule
  ],
  exports: [
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { ApiModule } from './api/api.module'
import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ApiModule.forRoot({
      graphqlEndpoint: 'gql',
      restEndpoint: 'rest',
      baseUrl: 'http://localhost:4000'
    }),
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

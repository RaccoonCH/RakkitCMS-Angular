import { Component } from '@angular/core'
import { Api } from './api/api.service'
import gql from 'graphql-tag'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  constructor(
    private api: Api
  ) {
    this.testQueries()
    setTimeout(() => {
      api.JwtToken = 'a'
      this.testQueries()
      setTimeout(() => {
        api.JwtToken = 'a2'
        this.testQueries()
      }, 4000)
    }, 4000)
  }

  testQueries() {
    this.api.RestClient.get('/').subscribe(data => {
      console.log('rest', data)
    })

    this.api.GraphqlClient.query({
      query: gql`
        query hello {
          hello
        }
      `,
    }).subscribe(data => {
      console.log('gql', data)
    })
  }

}

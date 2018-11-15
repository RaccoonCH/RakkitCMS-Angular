import {NgModule} from '@angular/core'
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular'
import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http'

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: null,
      deps: [HttpLink],
    }
  ]
})
export class GraphQLModule {}

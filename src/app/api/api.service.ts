import { Injectable } from '@angular/core'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { Apollo as AngularApollo } from 'apollo-angular'
import { HttpLink } from 'apollo-angular-link-http'
import { HttpClient } from '@angular/common/http'
import { FetchPolicy } from 'apollo-client'

export class ApiConfig {
  baseUrl: string
  restEndpoint: string
  graphqlEndpoint: string
  fetchPolicy?: FetchPolicy
}

@Injectable()
export class Api {
  private _baseUrl: string
  private _restEndpoint: string
  private _graphqlEndpoint: string
  private _graphqlClient: AngularApollo
  private _restClient: HttpClient
  private _jwtToken = ''

  public get RestEndpoint() {
    return this._restEndpoint
  }
  public set RestEndpoint(val: string) {
    this._restEndpoint = val
  }

  public get GraphqlEndpoint() {
    return this._graphqlEndpoint
  }
  public set GraphqlEndpoint(val: string) {
    this._graphqlEndpoint = val
  }

  public get JwtToken() {
    return this._jwtToken
  }
  public set JwtToken(val: string) {
    this._jwtToken = val
  }

  public get BaseUrl() {
    return this._baseUrl
  }

  public get RestUri() {
    return this.getUri(this.RestEndpoint)
  }

  public get GraphqlUri() {
    return this.getUri(this.GraphqlEndpoint)
  }

  public get GraphqlClient() {
    return this._graphqlClient
  }

  public get RestClient() {
    return this._restClient
  }

  public get HeaderAuthorization(): (null | string) {
    if (this._jwtToken) {
      return `Bearer ${this.JwtToken}`
    }
    return null
  }

  public constructor(
    angularApollo: AngularApollo,
    httpClient: HttpClient,
    httpLink: HttpLink,
    options?: ApiConfig
  ) {
    this._baseUrl = options.baseUrl || ''
    this._restEndpoint = options.restEndpoint || 'rest'
    this._graphqlEndpoint = options.graphqlEndpoint || 'gql'

    if (!angularApollo.default().getClient()) {
      const gqlHttpLink = httpLink.create({ uri: this.GraphqlUri })
      const fetchPolicy = {
        fetchPolicy: options.fetchPolicy
      }
      angularApollo.create({
        link: gqlHttpLink,
        cache: new InMemoryCache(),
        connectToDevTools: true,
        defaultOptions: {
          watchQuery: { ...fetchPolicy },
          query: { ...fetchPolicy }
        }
      })
    }

    this._graphqlClient = angularApollo
    this._restClient = httpClient
  }

  private getUri(endpoint: string) {
    return `${this.BaseUrl}/${endpoint}`
  }
}


import { AuthInterceptor } from './interceptors/auth.interceptor'
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core'
import { GraphQLModule } from '../graphql.module'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { HttpLinkModule } from 'apollo-angular-link-http'
import { Api, ApiConfig } from './api.service';
import { BaseUrlInterceptor } from './interceptors/baseurl.interceptor'

@NgModule({
  imports: [
    GraphQLModule,
    HttpClientModule,
    HttpLinkModule
  ],
  providers: [
    Api,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseUrlInterceptor,
      multi: true
    }
  ]
})
export class ApiModule {
  constructor (@Optional() @SkipSelf() parentModule: ApiModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only')
    }
  }

  static forRoot(apiConfig?: ApiConfig): ModuleWithProviders {
    return {
      ngModule: ApiModule,
      providers: [
        apiConfig ? { provide: ApiConfig, useValue: apiConfig } : { provide: ApiConfig }
      ]
    }
  }
}

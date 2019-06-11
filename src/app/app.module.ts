import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MockIdentityService } from './services/identity-services/mock-identity.service';
import { MockUserService } from './services/user-services/mock-user.service';
import { CallbackComponent } from '../../projects/jli-auth/src/lib/components/callback/callback.component';
import { AuthorizationService } from '../../projects/jli-auth/src/lib/services/auth-services/authorization.service';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { DemandesComponent } from './components/demandes/demandes.component';
import { BonsComponent } from './components/bons/bons.component';
import { AuthGuardService } from '../../projects/jli-auth/src/lib/services/auth-services/auth-guard.service';
import { MockAuthorizationServiceProvider } from './services/service-providers/mock-authorization.service-provider';
import { MockSuiviDeTransportServiceProvider } from './services/service-providers/mock-sdt.service-provider';
import { FactoryCriteriaPermissionInitService } from './services/factory-criteria-permission-init.service';
import { FactoryRedirectComponentRouteInitService } from './services/factory-redirect-component-route-init.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './services/system/token.interceptor';
import { OAuthStorage, OAuthModule } from 'angular-oauth2-oidc';
import { BrowserTokenStoreService } from './services/system/token-store.service';
import { LogoutComponent } from 'projects/jli-auth/src/lib/components/logout/logout.component';
import { AuthInitializerService } from 'projects/jli-auth/src/lib/services/auth-initializer-services/auth-initializer.service';

@NgModule({
  declarations: [
    AppComponent,
    CallbackComponent,
    HomeComponent,
    MenuComponent,
    DemandesComponent,
    BonsComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    OAuthModule.forRoot(),
  ],
  providers: [
    {
      provide: 'IIdentityService',
      useClass: MockIdentityService
    },
    {
      provide: 'IFactoryCriteriaPermissionInitService',
      useClass: FactoryCriteriaPermissionInitService
    },
    {
      provide: 'IFactoryRedirectComponentRouteInitService',
      useClass: FactoryRedirectComponentRouteInitService
    },
    {
      provide: 'IUserService',
      useClass: MockUserService
    },
    {
      provide: 'IAuthorizationService',
      useClass: AuthorizationService
    },
    AuthGuardService,
    {
      provide: 'IAuthorizationServiceProvider',
      useClass: MockAuthorizationServiceProvider
    },
    {
      provide: 'IAuthInitializerService',
      useClass: AuthInitializerService
    },
    AuthGuardService,
    {
      provide: 'ISuiviDeTransportServiceProvider',
      useClass: MockSuiviDeTransportServiceProvider
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: OAuthStorage,
      useClass: BrowserTokenStoreService
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

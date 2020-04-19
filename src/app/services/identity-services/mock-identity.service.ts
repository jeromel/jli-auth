import { OnInit, Injectable } from '@angular/core';
import { Observable, of, from, Subject } from 'rxjs';
import { IIdentityService } from '../../../../projects/jli-auth/src/lib/services/identity-services/iidentity.service';
import { OAuthService, JwksValidationHandler } from 'angular-oauth2-oidc';
import { authConfig } from 'src/app/config/auth.config';

@Injectable()
export class MockIdentityService implements IIdentityService {
    private _isUserAuthenticated: boolean;

    constructor(
        private oAuthService: OAuthService
    ) {
        this._isUserAuthenticated = false;
        this.subWhenUserAuthenticated = new Subject<boolean>();
        this.configure();
    }

    public configure(): void {
        this.oAuthService.configure(authConfig);
        this.oAuthService.tokenValidationHandler = new JwksValidationHandler();

        this.oAuthService.events.subscribe(e => {
            console.debug(e);
            if (e.type == "token_expires") {
                this.oAuthService.silentRefresh()
                .then(info => console.debug('refresh ok', info))
                .catch(err => console.error('refresh error', err));
            }
        });

        //this.oAuthService.setupAutomaticSilentRefresh();
    }
    public isUserAuthenticated(): boolean {
        return (this.oAuthService.hasValidIdToken() && this.oAuthService.hasValidAccessToken());
    }

    private subWhenUserAuthenticated: Subject<boolean>;
    
    public whenUserAuthenticated(): Observable<boolean> {
        return this.subWhenUserAuthenticated.asObservable();
    }

    public initialize(): void {
        this.oAuthService.loadDiscoveryDocumentAndTryLogin().then( (info) => {
            if (false === this.isUserAuthenticated()) {
                this.oAuthService.initImplicitFlow();
            }
            else {
                this.subWhenUserAuthenticated.next(true);
            }
          });
    }

    public logout(): void {
        this.oAuthService.logOut();
    }
}
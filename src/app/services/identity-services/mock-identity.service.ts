import { OnInit, Injectable } from '@angular/core';
import { Observable, of, from, Subject } from 'rxjs';
import { IIdentityService } from '../../../../projects/jli-auth/src/lib/services/identity-services/iidentity.service';
import { OAuthService, JwksValidationHandler } from 'angular-oauth2-oidc';
import { authConfig } from 'src/app/config/auth.config';

@Injectable()
export class MockIdentityService implements IIdentityService {
    constructor(
        private oAuthService: OAuthService
    ) {
        this.subWhenUserAuthenticated = new Subject<boolean>();
        this.configure();
    }

    public configure(): void {
        this.oAuthService.configure(authConfig);

        this.oAuthService.events.subscribe(e => {
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
        this.oAuthService.loadDiscoveryDocumentAndLogin().then( (info) => {
            if (false === this.isUserAuthenticated()) {
            }
            else {
                this.oAuthService.loadUserProfile().then((t) => {
                    this.subWhenUserAuthenticated.next(true);
                });
            }
          });
    }

    public logout(): void {
        this.oAuthService.logOut();
    }
}
import { Injectable, Inject } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { IAuthorizationService } from './iauthorization.service';
import { IIdentityService } from '../identity-services/iidentity.service';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(protected router: Router,
                @Inject('IIdentityService') private identityService: IIdentityService,
                @Inject('IAuthorizationService') protected authorizationService: IAuthorizationService) { }

    canActivate(route: ActivatedRouteSnapshot): Promise<boolean> | boolean {
        let ret: boolean = false;
        console.debug('canActivate');
        if (true == this.identityService.isUserAuthenticated()) {
            console.debug('user is authenticated');
            if (true == this.authorizationService.hasOneOfPermissions(route.data['auth'])) {
                console.debug('user hasOneOfPermissions');
                ret = true;
            }
        }

        return ret;
    }
}
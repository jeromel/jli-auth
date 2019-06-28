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

        if (true == this.identityService.isUserAuthenticated()) {
            if (false == route.data['auth'] || 0 == route.data['auth'].length) {
                ret = true;
            }
            else if (true == this.authorizationService.hasOneOfPermissions(route.data['auth'])) {
                ret = true;
            }
        }

        return ret;
    }
}
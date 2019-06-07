import { Injectable, Inject } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { IAuthorizationService } from './iauthorization.service';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(protected router: Router,
                @Inject('IAuthorizationService') protected authorizationService: IAuthorizationService) { }

    canActivate(route: ActivatedRouteSnapshot): Promise<boolean> | boolean {
        return this.authorizationService.hasOneOfPermissions(route.data['auth']);
    }
}
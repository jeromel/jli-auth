import { IAuthInitializerService } from './iauth-initializer-service';
import { Inject } from '@angular/core';
import { IIdentityService } from '../identity-services/iidentity.service';
import { Params, Router } from '@angular/router';
import { IAuthorizationService } from '../auth-services/iauthorization.service';
import { IUserService } from '../user-services/iuser.service';
import { IFactoryCriteriaPermissionInitService } from '../ifactory-criteria-permission-init.service';
import { IFactoryRedirectComponentRouteInitService } from 'jli-auth/lib/services/ifactory-redirect-component-route-init.service';
import { CriteriaPermission } from '../../models/models';

export class AuthInitializerService implements IAuthInitializerService{
    constructor(
        @Inject('IIdentityService') private identityService: IIdentityService,
        @Inject('IAuthorizationService') private authorizationService: IAuthorizationService,
        @Inject('IUserService') private userService: IUserService,
        @Inject('IFactoryCriteriaPermissionInitService') private factoryCriteriaPermissionInitService: IFactoryCriteriaPermissionInitService,
        @Inject('IFactoryRedirectComponentRouteInitService') private factoryRedirectComponentRouteInitService: IFactoryRedirectComponentRouteInitService,
        private router: Router,
    ) {

    }

    public initialize(): void {
        if (this.identityService.isUserAuthenticated()) {
            console.debug('authenticated');
            this.getUserAuthInformation();
          } else {
            console.debug('InitFlow.start');
            this.identityService.initialize();
            this.identityService.whenUserAuthenticated().subscribe(res => {
              if (true == res) {
                this.getUserAuthInformation();
              }
            });
          }
    }

    private getUserAuthInformation(): void {
        this.userService.getUser(false).subscribe(user => {
            let criteria: CriteriaPermission = this.factoryCriteriaPermissionInitService.getCriteriaPermissionForInit(user);
            this.authorizationService.initializePermissions(criteria, true).subscribe(perms => {
              let qParam: Params;
              
              let route: string = this.factoryRedirectComponentRouteInitService.GetComponentRouteForAfterInit(user, perms);
      
              this.router.navigate([route], { queryParams: qParam });
            });
          })
    }
}
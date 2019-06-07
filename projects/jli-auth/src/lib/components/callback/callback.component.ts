import { Component, OnInit, Inject } from '@angular/core';
import { IIdentityService } from '../../services/identity-services/iidentity.service';
import { IUserService } from '../../services/user-services/iuser.service';
import { Router, Params } from '@angular/router';
import { CriteriaPermission } from '../../models/Criterias/criteria-permission';
import { IAuthorizationService } from '../../services/auth-services/iauthorization.service';
import { IFactoryCriteriaPermissionInitService } from '../../services/ifactory-criteria-permission-init.service';
import { IFactoryRedirectComponentRouteInitService } from '../../services/ifactory-redirect-component-route-init.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

  constructor(
    @Inject('IIdentityService') private identityService: IIdentityService,
    @Inject('IUserService') private userService: IUserService,
    @Inject('IAuthorizationService') private authorizationService: IAuthorizationService,
    @Inject('IFactoryCriteriaPermissionInitService') private factoryCriteriaPermissionInitService: IFactoryCriteriaPermissionInitService,
    @Inject('IFactoryRedirectComponentRouteInitService') private factoryRedirectComponentRouteInitService: IFactoryRedirectComponentRouteInitService,
    private router: Router) {
  }

  ngOnInit() {
    if (this.identityService.isUserAuthenticated()) {
    } else {
      this.identityService.initFlow().subscribe(isInitialized => {
        this.userService.getUser(false).subscribe(user => {
          let criteria: CriteriaPermission = this.factoryCriteriaPermissionInitService.getCriteriaPermissionForInit(user);
          this.authorizationService.initializePermissions(criteria, true).subscribe(perms => {
            let qParam: Params;
            
            let route: string = this.factoryRedirectComponentRouteInitService.GetComponentRouteForAfterInit(user, perms);

            this.router.navigate([route], { queryParams: qParam });
          });
        })
      });
    }
  }
}

import { Component, OnInit, Inject } from '@angular/core';
import { IIdentityService } from 'src/app/services/identity-services/iidentity.service';
import { IUserService } from 'src/app/services/user-services/iuser.service';
import { Router, Params } from '@angular/router';
import { CriteriaPermission } from 'src/app/models/Criterias/criteria-permission';
import { IAuthorizationService } from 'src/app/services/auth-services/iauthorization.service';

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
    private router: Router) {
  }

  ngOnInit() {
    if (this.identityService.isUserAuthenticated()) {
      console.debug('callback.userAuthenticated');
    } else {
      console.debug('callback.userNot');
      this.identityService.initFlow().subscribe(res => {
        console.debug('identityService.initFlow: ' + res);
        this.userService.getUser(false).subscribe(res => {
          console.debug(res);
          let criteriaPermissions: CriteriaPermission = new CriteriaPermission;
          criteriaPermissions.ResourceName = res.Email;
          criteriaPermissions.DomainName = 'SuiviDeTransport';
          criteriaPermissions.GroupsName = [];
          criteriaPermissions.GroupsName.push(res.Groups[0].Name);

          this.authorizationService.initializePermissions(criteriaPermissions, false).subscribe(res => {
            let personalHomepage: string = 'home';
            let qParam: Params;
            
            console.debug('identityService.initializePermissions: ' + res.length);
            this.router.navigate([personalHomepage], { queryParams: qParam });
          });
        })
      });
    }
  }
}

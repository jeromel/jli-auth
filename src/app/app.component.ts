import { Component, OnInit, Inject } from '@angular/core';
import { IIdentityService } from '../../projects/jli-auth/src/lib/services/identity-services/iidentity.service';
import { IUserService } from '../../projects/jli-auth/src/lib/services/user-services/iuser.service';
import { Router, Params } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title = 'test-id-auth';

  constructor(
    @Inject('IIdentityService') private identityService: IIdentityService,
    @Inject('IUserService') private userService: IUserService,
    private router: Router) {

  }

  ngOnInit(): void {
    this.simulateCallbackReturnFromIdSrv();
  }

  public simulateCallbackReturnFromIdSrv(): void {
    let callbackNamePage: string = 'callback';
    let qParam: Params;
    
    this.router.navigate([callbackNamePage], { queryParams: qParam });
  }
}

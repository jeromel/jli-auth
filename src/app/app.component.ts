import { Component, OnInit, Inject } from '@angular/core';
import { IIdentityService } from '../../projects/jli-auth/src/lib/services/identity-services/iidentity.service';
import { IUserService } from '../../projects/jli-auth/src/lib/services/user-services/iuser.service';
import { Router, Params } from '@angular/router';
import { IAuthInitializerService } from 'projects/jli-auth/src/lib/services/auth-initializer-services/iauth-initializer-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title = 'test-id-auth';

  constructor(
    @Inject('IAuthInitializerService') private authInitializerService: IAuthInitializerService,
    @Inject('IUserService') private userService: IUserService,
    private router: Router) {

  }

  ngOnInit(): void {
    this.authInitializerService.whenInitialized().subscribe(() => {
      this.redirectHome();
    });
    
    this.authInitializerService.initialize();
  }

  public redirectHome(): void {
    let qParam: Params;

    this.router.navigate(['home'], { queryParams: qParam });
  }
  public simulateCallbackReturnFromIdSrv(): void {
    let callbackNamePage: string = 'callback';
    let qParam: Params;
    
    this.router.navigate([callbackNamePage], { queryParams: qParam });
  }
}

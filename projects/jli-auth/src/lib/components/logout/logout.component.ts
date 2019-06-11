import { Component, OnInit, Inject } from '@angular/core';
import { IIdentityService } from '../../services/identity-services/iidentity.service';

@Component({
  selector: 'lib-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    @Inject('IIdentityService') private identityService: IIdentityService,
  ) { }

  ngOnInit() {
    console.debug('logout');
    this.identityService.logout();
  }

}

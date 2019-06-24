import { Component, OnInit, Inject } from '@angular/core';
import { IIdentityService } from '../../services/identity-services/iidentity.service';

@Component({
  selector: 'jli-logout',
  templateUrl: './jli-logout.component.html',
  styleUrls: ['./jli-logout.component.css']
})
export class JliLogoutComponent implements OnInit {

  constructor(
    @Inject('IIdentityService') private identityService: IIdentityService,
  ) { }

  ngOnInit() {
    console.debug('logout');
    this.identityService.logout();
  }

}

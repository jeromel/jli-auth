import { Component, OnInit, Inject } from '@angular/core';
import { IIdentityService } from 'projects/jli-auth/src/public_api';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    @Inject('IIdentityService') private identityService: IIdentityService
  ) { }

  ngOnInit() {
    this.identityService.logout();
  }

}

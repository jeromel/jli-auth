import { Component, OnInit, Inject } from '@angular/core';
import { IIdentityService } from '../../services/identity-services/iidentity.service';
import { IAuthInitializerService } from '../../services/auth-initializer-services/iauth-initializer-service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

  constructor(
    @Inject('IAuthInitializerService') private authInitializerService: IAuthInitializerService
    ) {
  }

  ngOnInit() {
    this.authInitializerService.initialize();
  }
}

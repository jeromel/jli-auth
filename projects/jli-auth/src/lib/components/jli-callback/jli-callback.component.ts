import { Component, OnInit, Inject } from '@angular/core';
import { IAuthInitializerService } from '../../services/auth-initializer-services/iauth-initializer-service';

@Component({
  selector: 'jli-callback',
  templateUrl: './jli-callback.component.html',
  styleUrls: ['./jli-callback.component.css']
})
export class JliCallbackComponent implements OnInit {

  constructor(
    @Inject('IAuthInitializerService') private authInitializerService: IAuthInitializerService
    ) {
  }

  ngOnInit() {
    this.authInitializerService.initialize();
  }
}

import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { IUserService } from 'projects/jli-auth/src/lib/services/user-services/iuser.service';
import { User } from 'projects/jli-auth/src/lib/models/user';
import { Permission } from 'projects/jli-auth/src/lib/models/permission';
import { IAuthorizationService } from 'projects/jli-auth/src/lib/services/auth-services/iauthorization.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  private _user: User;
  public get User(): User {
    return this._user;    
  }
  public set User(value: User) {
    this._user = value;
  }

  private _permissions: Array<Permission>;
  public get Permissions(): Array<Permission> {
    return this._permissions;
  }
  public set Permissions(value: Array<Permission>) {
    this._permissions = value;
  }
  
  constructor(
    @Inject('IUserService') private userService: IUserService,
    @Inject('IAuthorizationService') private authorizationService: IAuthorizationService,
  ) { 
  }

  ngOnInit() {
    this.userService.getUser(false).subscribe(user => {
      this.User = user;
    });
    console.debug('GetPermissions ??');
    this.authorizationService.getPermissions().subscribe(permissions => {
      this.Permissions = permissions;
    })
  }

}

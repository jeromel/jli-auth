import { IAuthInitializerService } from './iauth-initializer-service';
import { Inject } from '@angular/core';
import { IIdentityService } from '../identity-services/iidentity.service';
import { Router } from '@angular/router';
import { IAuthorizationService } from '../auth-services/iauthorization.service';
import { IUserService } from '../user-services/iuser.service';
import { IFactoryCriteriaPermissionInitService } from '../ifactory-criteria-permission-init.service';
import { CriteriaPermission } from '../../models/models';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export class AuthInitializerService implements IAuthInitializerService{
    constructor(
        @Inject('IIdentityService') private identityService: IIdentityService,
        @Inject('IAuthorizationService') private authorizationService: IAuthorizationService,
        @Inject('IUserService') private userService: IUserService,
        @Inject('IFactoryCriteriaPermissionInitService') private factoryCriteriaPermissionInitService: IFactoryCriteriaPermissionInitService,
    ) {

    }

    private _whenInitialized: Subject<boolean> = new Subject<boolean>();
    public whenInitialized(): Observable<boolean> {
      return this._whenInitialized.asObservable();
    }

    public initialize(): void {
        if (this.identityService.isUserAuthenticated()) {
            this.getUserAuthInformation();
          } else {
            this.identityService.initialize();
            this.unsubscribe.next();

            this.identityService.whenUserAuthenticated().pipe(takeUntil(this.unsubscribe)).subscribe(res => {
              if (true == res) {
                this.getUserAuthInformation();
              }
            });
          }
    }

    private unsubscribe: Subject<void> = new Subject();

    private getUserAuthInformation(): void {
        this.userService.getUser(false).subscribe(user => {
            let criteria: CriteriaPermission = this.factoryCriteriaPermissionInitService.getCriteriaPermissionForInit(user);
            this.authorizationService.initializePermissions(criteria, true).subscribe(perms => {
              this._whenInitialized.next(true);
            });
          })
    }
}
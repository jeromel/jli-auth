import { IAuthorizationService } from './iauthorization.service';
import { CriteriaPermission } from '../../models/Criterias/criteria-permission';
import { Observable, Subject, of } from 'rxjs';
import { Permission } from '../../models/permission';
import { IAuthorizationServiceProvider } from '../service-providers/iauthorization.service-provider';
import { Inject } from '@angular/core';

export class AuthorizationService implements IAuthorizationService {
    private _permissions: Array<Permission>;
    
    private subPermissions: Subject<Array<Permission>>;

    constructor(
        @Inject('IAuthorizationServiceProvider') private authorizationServiceProvider : IAuthorizationServiceProvider
    ) {
        this.subPermissions = new Subject<Array<Permission>>();
        this._permissions = null;
    }

    public initializePermissions(criteriaPermission: CriteriaPermission, forceUpdate: boolean): Observable<Array<Permission>> {
        let ret: Observable<Array<Permission>> = null;

        if (true === forceUpdate || null == this._permissions) {
            ret = this.authorizationServiceProvider.getPermissionsFromCriteria(criteriaPermission);
            ret.toPromise().then(perms => {
                this._permissions = perms;
                this.subPermissions.next(this._permissions);
            })
        }
        else {
            ret = of(this._permissions);
        }

        return ret;
    }

    private lastUsedCriteriaPermissions: CriteriaPermission;

    public getPermissions(): Observable<Array<Permission>> {
        let ret: Observable<Array<Permission>> = null;

        if (this._permissions) {
            ret = of(this._permissions);
            this.subPermissions.next(this._permissions);
        }
        else {
            ret = this.subPermissions.asObservable();

            this.authorizationServiceProvider.getPermissionsFromCriteria(this.lastUsedCriteriaPermissions).toPromise().then(permissions => {
                this._permissions = permissions;
                this.subPermissions.next(this._permissions);
            })
        }

        return ret;
    }

    public hasOneOfPermissions(perms: Array<Permission>): boolean {
        let ret: boolean = false;
        
        if (perms) {
            if (this._permissions) {
                if (this._permissions.some(permission => {
                    return perms.some(pp => { return pp.Name == permission.Name});
                })) {
                    ret = true;
                }
            }
        }

        return ret;
    }
}
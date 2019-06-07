import { IAuthorizationServiceProvider } from './iauthorization.service-provider';

import { Permission } from 'src/app/models/permission';

import { CriteriaPermission } from 'src/app/models/Criterias/criteria-permission';

import { Observable, of } from 'rxjs';

export class MockAuthorizationServiceProvider implements IAuthorizationServiceProvider {
    _permissions: Permission[];

    private fakePermissions(): Array<Permission> {
        let permissions: Array<Permission> = [];
        
        permissions.push({Name: 'CanReadDemande'});
        permissions.push({Name: 'CanReadBon'});

        return permissions;
    }

    public getPermissionsFromCriteria(criteriaPermission: CriteriaPermission): Observable<Array<Permission>> {
        let ret: Observable<Array<Permission>> = null;

        this._permissions = this.fakePermissions();

        ret = of(this._permissions);

        return ret;
    }
}
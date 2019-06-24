import { IAuthorizationServiceProvider } from '../../../../projects/jli-auth/src/lib/services/service-providers/iauthorization.service-provider';

import { Permission } from 'projects/jli-auth/src/lib/models/permission';

import { CriteriaPermission } from 'projects/jli-auth/src/lib/models/Criterias/criteria-permission';

import { Observable, of } from 'rxjs';

export class MockAuthorizationServiceProvider implements IAuthorizationServiceProvider {
    _permissions: Permission[];

    private fakePermissions(): Array<Permission> {
        let permissions: Array<Permission> = [];
        
        permissions.push(new Permission('CanReadDemande'));

        return permissions;
    }

    public getPermissionsFromCriteria(criteriaPermission: CriteriaPermission): Observable<Array<Permission>> {
        let ret: Observable<Array<Permission>> = null;

        this._permissions = this.fakePermissions();

        ret = of(this._permissions);

        return ret;
    }
}
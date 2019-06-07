import { Observable } from 'rxjs';
import { CriteriaPermission } from '../../models/Criterias/criteria-permission';
import { Permission } from '../../models/permission';

export interface IAuthorizationService {
    initializePermissions(criteriaPermission: CriteriaPermission, forceUpdate: boolean): Observable<Array<Permission>>;

    getPermissions(): Observable<Array<Permission>>;

    hasOneOfPermissions(perms: Array<Permission>): boolean;
}
import { Permission } from '../../models/permission';
import { Observable } from 'rxjs';
import { CriteriaPermission } from '../../models/Criterias/criteria-permission';

export interface IAuthorizationServiceProvider {
    getPermissionsFromCriteria(criteriaPermission: CriteriaPermission): Observable<Array<Permission>>;
}
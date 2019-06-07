import { Permission } from 'src/app/models/permission';
import { Observable } from 'rxjs';
import { CriteriaPermission } from 'src/app/models/Criterias/criteria-permission';

export interface IAuthorizationServiceProvider {
    getPermissionsFromCriteria(criteriaPermission: CriteriaPermission): Observable<Array<Permission>>;
}
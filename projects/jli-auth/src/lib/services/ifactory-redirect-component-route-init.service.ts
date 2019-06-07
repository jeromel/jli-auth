import { CriteriaPermission } from '../models/Criterias/criteria-permission';
import { User } from '../models/user';
import { Permission } from '../models/permission';

export interface IFactoryRedirectComponentRouteInitService {
    GetComponentRouteForAfterInit(user: User, permissons: Array<Permission>): string;
}
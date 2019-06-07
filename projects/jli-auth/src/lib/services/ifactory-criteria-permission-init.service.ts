import { CriteriaPermission } from '../models/Criterias/criteria-permission';
import { User } from '../models/user';

export interface IFactoryCriteriaPermissionInitService {
    getCriteriaPermissionForInit(user: User): CriteriaPermission;
}
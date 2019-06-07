import { IFactoryCriteriaPermissionInitService } from 'projects/jli-auth/src/lib/services/ifactory-criteria-permission-init.service';
import { CriteriaPermission } from 'projects/jli-auth/src/lib/models/Criterias/criteria-permission';
import { User } from 'projects/jli-auth/src/lib/models/user';

export class FactoryCriteriaPermissionInitService implements IFactoryCriteriaPermissionInitService {
    public getCriteriaPermissionForInit(user: User): CriteriaPermission {
        let criteriaPermission: CriteriaPermission = new CriteriaPermission;
        criteriaPermission.DomainName = "SuiviDeTransport";
        criteriaPermission.GroupsName = [];
        criteriaPermission.GroupsName.push(user.Groups[0].Name);
        criteriaPermission.ResourceName = user.Email;
        
        return criteriaPermission;
    }
}
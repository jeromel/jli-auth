import { IFactoryRedirectComponentRouteInitService } from 'projects/jli-auth/src/lib/services/ifactory-redirect-component-route-init.service';
import { User } from 'projects/jli-auth/src/lib/models/user';
import { Permission } from 'projects/jli-auth/src/lib/models/permission';

export class FactoryRedirectComponentRouteInitService implements IFactoryRedirectComponentRouteInitService {
    GetComponentRouteForAfterInit(user: User, permissons: Array<Permission>): string {
        return 'home';
    }

}
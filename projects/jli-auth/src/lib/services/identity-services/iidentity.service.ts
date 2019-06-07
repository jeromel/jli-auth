import { Observable } from 'rxjs';

export interface IIdentityService {
    isUserAuthenticated(): boolean;
    initFlow(): Observable<boolean>;
}
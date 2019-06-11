import { Observable } from 'rxjs';

export interface IIdentityService {
    isUserAuthenticated(): boolean;
    whenUserAuthenticated(): Observable<boolean>;
    initialize(): void;
    logout(): void;
}
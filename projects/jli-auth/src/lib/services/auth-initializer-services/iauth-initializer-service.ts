import { Observable } from 'rxjs';

export interface IAuthInitializerService {
    initialize() : void;
    whenInitialized(): Observable<boolean>;
}
import { Observable } from 'rxjs';
import { User } from '../../models/user';

export interface IUserService {
    getUser(forceUpdate: boolean): Observable<User>;
}
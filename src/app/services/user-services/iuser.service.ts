import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';

export interface IUserService {
    getUser(forceUpdate: boolean): Observable<User>;
}
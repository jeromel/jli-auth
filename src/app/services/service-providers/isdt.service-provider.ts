import { Observable } from 'rxjs';
import { UserSDT } from 'src/app/models/user-sdt';

export interface ISuiviDeTransportServiceProvider {
    getUserSDT(): Observable<UserSDT>;
}
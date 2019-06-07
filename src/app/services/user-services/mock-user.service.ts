import { IUserService } from './iuser.service';
import { User } from '../../models/user';
import { Observable , of, Subject } from 'rxjs';
import { ISuiviDeTransportServiceProvider } from '../service-providers/isdt.service-provider';
import { Inject } from '@angular/core';
import { UserSDT } from 'src/app/models/user-sdt';

export class MockUserService implements IUserService {
    private _userSDT: UserSDT

    private subUser: Subject<User>;

    constructor(
        @Inject('ISuiviDeTransportServiceProvider') private sdtServiceProvider: ISuiviDeTransportServiceProvider
    ) {
        this._userSDT = null;
        this.subUser = new Subject<User>();
    }

    public getUser(forceUpdate: boolean = false): Observable<User> {
        let ret: Observable<User>;

        if (true === forceUpdate || null == this._userSDT || null == this._userSDT.User) {
            ret = this.subUser.asObservable();

            this.sdtServiceProvider.getUserSDT().toPromise().then(userSDT => {
                this._userSDT = userSDT;

                this.subUser.next(this._userSDT.User);
            })
        }
        else {
            ret = of(this._userSDT.User);
        }
        
        return ret;
    }
}
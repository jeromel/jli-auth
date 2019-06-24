import { ISuiviDeTransportServiceProvider } from './isdt.service-provider';
import { UserSDT } from 'src/app/models/user-sdt';
import { User } from 'projects/jli-auth/src/lib/models/user';
import { Observable, of } from 'rxjs';

export class MockSuiviDeTransportServiceProvider implements ISuiviDeTransportServiceProvider {
    public getUserSDT(): Observable<UserSDT> {
        let ret: Observable<UserSDT> = null;

        ret = of(this.fakeUser());

        return ret;
    }

    private fakeUser(): UserSDT {
        let userSDT: UserSDT = new UserSDT;

        let user: User = new User();
        user.Firstname = 'Jérôme';
        user.Lastname = 'Libbrecht';
        user.Email = "jlibbrecht@toto.com";
        user.Groups = [ { Id: 0, Name: 'GroupA'}, { Id: 1, Name: 'GroupB'} ];

        userSDT.User = user;

        return userSDT;
    }

}
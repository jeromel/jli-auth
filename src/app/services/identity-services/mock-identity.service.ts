import { OnInit, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IIdentityService } from './iidentity.service';

@Injectable()
export class MockIdentityService implements IIdentityService {
    private _isUserAuthenticated: boolean;

    constructor() {
        this._isUserAuthenticated = false;
    }

    public isUserAuthenticated(): boolean {
        return this._isUserAuthenticated;
    }

    public initFlow(): Observable<boolean> {
        this._isUserAuthenticated = true;

        return of(this._isUserAuthenticated);
    }
}
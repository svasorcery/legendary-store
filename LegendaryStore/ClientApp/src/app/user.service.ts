import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserInfo } from './app.models';

@Injectable()
export class UserService {
    private _url: string;

    constructor(
        @Inject('BASE_URL') baseUrl: string,
        private _http: HttpClient
    ) {
        this._url = `${baseUrl}/api/who-am-i`;
    }

    public WhoAmI = (): Observable<UserInfo> =>
        this._http.get<UserInfo>(this._url)
}

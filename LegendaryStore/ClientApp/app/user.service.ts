import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { UserInfo } from './app.models';

@Injectable()
export class UserService {
    private _url: string;

    constructor(
        @Inject('BASE_URL') private baseUrl: string,
        private _http: Http
    ) {
        this._url = `${baseUrl}/api/who-am-i`
    }
    
    public WhoAmI(): Observable<UserInfo> {
        return this._http.get(this._url)
            .map((response: Response) => response.json() as UserInfo);
    }
}

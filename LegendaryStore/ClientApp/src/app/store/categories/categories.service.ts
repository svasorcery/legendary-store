import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/';
import { delay } from 'rxjs/operators';

import { CategoryMenuItem } from '../store.models';

@Injectable()
export class CategoriesService {
    private _url: string;

    constructor(
        private _http: HttpClient,
        @Inject('BASE_URL') baseUrl
    ) {
        this._url = baseUrl + 'api/categories';
    }

    public getCategoriesMenuTree = (): Observable<CategoryMenuItem[]> =>
        this._http.get<CategoryMenuItem[]>(this._url)
            .pipe(delay(1000)) // emulate remote server data fetching latency
}

import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CategoryMenuItem, Category } from '../store.models';

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

    public getCategory = (id: number): Observable<Category> =>
        this._http.get<Category>(`${this._url}/${id}`)
}

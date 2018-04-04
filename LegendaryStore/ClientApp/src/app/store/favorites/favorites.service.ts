import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Favorite } from '../store.models';

@Injectable()
export class FavoritesService {
    private _url: string;

    constructor(
        private _http: HttpClient,
        @Inject('BASE_URL') baseUrl
    ) { 
        this._url = baseUrl + 'api/favorites';
    }
    
    public getItems = (): Observable<Favorite[]> =>
        this._http.get<Favorite[]>(this._url)
            .delay(1000); // emulate remote server data fetching latency
    
    public addItem = (productId: number): Observable<Favorite> =>
        this._http.get<Favorite>(`${this._url}/add/${productId}`);
    
    public removeItem = (productId: number): Observable<Favorite> =>
        this._http.get<Favorite>(`${this._url}/remove/${productId}`);
}

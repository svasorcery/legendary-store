import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';

import { Favorite } from '../store.models';

@Injectable()
export class FavoritesService {
    private _url: string;

    constructor(
        private _http: Http,
        @Inject('BASE_URL') baseUrl
    ) { 
        this._url = baseUrl + 'api/favorites';
    }
    
    public getItems(): Observable<Favorite[]> {
        return this._http.get(this._url)
            .delay(1000) // emulate remote server data fetching latency
            .map((response: Response) => response.json() as Favorite[]);
    }
    
    public addItem(productId: number): Observable<Favorite> {
        return this._http.get(`${this._url}/add/${productId}`)
            .map((response: Response) => response.json() as Favorite);
    }
    
    public removeItem(productId: number): Observable<Favorite> {
        return this._http.get(`${this._url}/remove/${productId}`)
            .map((response: Response) => response.json() as Favorite);
    }
}

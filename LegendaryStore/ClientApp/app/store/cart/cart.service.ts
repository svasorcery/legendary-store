import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';

import { CartItem } from '../store.models';

@Injectable()
export class CartService {
    private _url: string;

    constructor(
        private _http: Http,
        @Inject('BASE_URL') baseUrl
    ) { 
        this._url = baseUrl + 'api/cart';
    }
    
    public getItems(): Observable<CartItem[]> {
        return this._http.get(this._url)
            .delay(1000) // emulate remote server data fetching latency
            .map((response: Response) => response.json() as CartItem[])
    }
    
    public addItem(productId: number): Observable<CartItem> {
        return this._http.get(`${this._url}/add/${productId}`)
            .delay(1000) // emulate remote server data fetching latency
            .map((response: Response) => response.json() as CartItem)
    }
    
    public removeItem(productId: number): Observable<CartItem> {
        return this._http.get(`${this._url}/remove/${productId}`)
            .delay(1000) // emulate remote server data fetching latency
            .map((response: Response) => response.json() as CartItem)
    }
}

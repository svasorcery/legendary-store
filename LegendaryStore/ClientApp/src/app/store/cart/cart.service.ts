import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';

import { CartItem } from '../store.models';

@Injectable()
export class CartService {
    private _url: string;

    constructor(
        private _http: HttpClient,
        @Inject('BASE_URL') baseUrl
    ) {
        this._url = baseUrl + 'api/cart';
    }

    public getItems = (): Observable<CartItem[]> =>
        this._http.get<CartItem[]>(this._url)
            .pipe(delay(1000)) // emulate remote server data fetching latency
            .pipe(map(data => {
                return data.map(x => new CartItem(
                    x.id, x.productId, x.product, x.quantity, x.pricePerUnit, x.priceCalculatedAt)
                );
            }))

    public addItem = (productId: number): Observable<CartItem> =>
        this._http.get<CartItem>(`${this._url}/add/${productId}`)
            .pipe(delay(1000)) // emulate remote server data fetching latency

    public removeItem = (productId: number): Observable<CartItem> =>
        this._http.get<CartItem>(`${this._url}/remove/${productId}`)
            .pipe(delay(1000)) // emulate remote server data fetching latency
}

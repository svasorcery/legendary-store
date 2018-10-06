import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { CartItem } from '../store.models';

@Injectable()
export class CartService {
    private _url: string;
    private _items: CartItem[];
    private _notification: Subject<CartItem[]>;
    public readonly cartItems$: Observable<CartItem[]>;

    constructor(
        private _http: HttpClient,
        @Inject('BASE_URL') baseUrl
    ) {
        this._url = baseUrl + 'api/cart';
        this._notification = new Subject();
        this.cartItems$ = this._notification.asObservable();
    }

    public getItems = (): Observable<CartItem[]> =>
        this._http.get<CartItem[]>(this._url)
            .pipe(map(data => {
                const items = data.map(x => new CartItem(
                    x.id, x.productId, x.product, x.quantity, x.pricePerUnit, x.priceCalculatedAt)
                );
                this._items = items;
                return items;
            }))

    public addItem = (productId: number) =>
        this._http.get<CartItem>(`${this._url}/add/${productId}`)
            .subscribe(
                result => {
                    const item = this._items.find(i => i.id === result.id);
                    if (item) {
                        item.quantity++;
                    } else {
                        this._items.push(result);
                    }
                    this.notify();
                },
                error => console.log(error)
            )

    public removeItem = (productId: number) =>
        this._http.get<CartItem>(`${this._url}/remove/${productId}`)
            .subscribe(
                result => {
                    const index = this._items.indexOf(result);
                    this._items.splice(index, 1);
                    this.notify();
                },
                error => console.log(error)
            )


    private notify = () => this._notification.next(this._items);
}

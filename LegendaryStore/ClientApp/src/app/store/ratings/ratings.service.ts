import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Rating, RatingRate } from '../store.models';

@Injectable()
export class RatingsService {
    private _url: string;

    constructor(
        private _http: HttpClient,
        @Inject('BASE_URL') baseUrl
    ) {
        this._url = baseUrl + 'api/ratings';
    }

    public getItem = (productId: number): Observable<Rating> =>
        this._http.get<Rating>(`${this._url}/${productId}`)

    public getTotalRate = (productId: number): Observable<{ total: number, byUser: number }> =>
        this._http.get<{ total: number, byUser: number }>(`${this._url}/${productId}/total`);

    public rateItem = (productId: number, rate: RatingRate): Observable<Rating> =>
        this._http.post<Rating>(`${this._url}/rate/${productId}`, {
            productId: productId,
            rate: rate
         })
}

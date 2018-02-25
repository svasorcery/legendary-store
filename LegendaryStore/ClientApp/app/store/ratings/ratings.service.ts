import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';

import { Rating, RatingRate } from '../store.models';

@Injectable()
export class RatingsService {
    private _url: string;

    constructor(
        private _http: Http,
        @Inject('BASE_URL') baseUrl
    ) { 
        this._url = baseUrl + 'api/ratings';
    }
    
    public getItem(productId: number): Observable<Rating> {
        return this._http.get(`${this._url}/${productId}`)
            .map((response: Response) => response.json() as Rating);
    }

    public getTotalRate(productId: number): Observable<{ rating: number }> {
        return  this._http.get(`${this._url}/${productId}/total`)
            .map((response: Response) => response.json() as { rating: number });
    }
    
    public rateItem(productId: number, rate: RatingRate): Observable<Rating> {
        return this._http.post(`${this._url}/rate/${productId}`, { 
            productId: productId,
            rate: rate
         })
            .map((response: Response) => response.json() as Rating);
    }
}

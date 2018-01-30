import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';

import { Product } from '../store.models';

@Injectable()
export class ProductsService {
    private _url: string;

    constructor(
        private _http: Http,
        @Inject('BASE_URL') baseUrl
    ) { 
        this._url = baseUrl + 'api/products';
    }
    
    public getProducts(categoryId: number): Observable<Product[]> {
        return this._http.get(`${this._url}/by-category/${categoryId}`)
            .delay(1000) // emulate remote server data fetching latency
            .map((response: Response) => response.json() as Product[])
    }
}


import { IAutoCompleteListSource } from '../../shared/autocomplete.component';

export class ProductsListSource implements IAutoCompleteListSource {

    constructor(private http: Http, private baseUrl: string) { }

    search(term: string): Observable<{ name: string }[]> {
        let params = new URLSearchParams();
        params.set('term', term);
        return this.http.get(this.baseUrl + '/api/products/search', { search: params })
            .map((response: Response) => response.json() as Product[]);
    }
}

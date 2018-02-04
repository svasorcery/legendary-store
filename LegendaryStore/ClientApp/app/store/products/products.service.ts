import { Injectable, Inject } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';

import { ProductsList, Product } from '../store.models';

@Injectable()
export class ProductsService {
    private _url: string;
    private _productsSource: ProductsListSource;

    public get productsSource(): ProductsListSource {
        return this._productsSource;
    }

    constructor(
        private _router: Router,
        private _http: Http,
        @Inject('BASE_URL') baseUrl
    ) { 
        this._url = baseUrl + 'api/products';
        this._productsSource = new ProductsListSource(_http, baseUrl);
    }
    
    public getProducts(categoryId: number, page: number = 1): Observable<ProductsList> {
        return this._http.get(`${this._url}/by-category/${categoryId}?page=${page}`)
            .delay(1000) // emulate remote server data fetching latency
            .map((response: Response) => response.json() as ProductsList);
    }
    
    public getProduct(id: number): Observable<Product> {
        return this._http.get(`${this._url}/${id}`)
            .delay(1000) // emulate remote server data fetching latency
            .map((response: Response) => response.json() as Product);
    }

    public postProduct(value: Product): Observable<Product> {
        return this._http.post(`${this._url}`, value)
            .map((response: Response) => response.json() as Product);
    }

    public putProduct(id: number, value: Product): Observable<Product> {
        return this._http.put(`${this._url}/${id}`, value)
            .map((response: Response) => response.json() as Product);
    }


    public gotoList(categoryId: number): void {
        this._router.navigate(['store', 'categories', categoryId]);
    }

    public gotoEdit(categoryId: number, itemId: number): void {
        this._router.navigate(['store', 'categories', categoryId, 'products', itemId, 'edit']);
    }

    public gotoCreate(categoryId: number): void {
        this._router.navigate(['store', 'categories', categoryId, 'products', 'create']);
    }
}


import { IAutoCompleteListSource } from '../../shared/autocomplete.component';

export class ProductsListSource implements IAutoCompleteListSource {

    constructor(private http: Http, private baseUrl: string) { }

    search(term: string): Observable<{ name: string }[]> {
        let params = new URLSearchParams();
        params.set('term', term);
        return this.http.get(this.baseUrl + 'api/products/search', { search: params })
            .map((response: Response) => response.json() as Product[]);
    }
}

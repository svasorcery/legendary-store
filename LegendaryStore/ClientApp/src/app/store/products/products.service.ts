import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ProductsList, Product, ProductDetails } from '../store.models';

@Injectable()
export class ProductsService {
    private _url: string;
    private _productsSource: ProductsListSource;

    public get productsSource(): ProductsListSource {
        return this._productsSource;
    }

    constructor(
        private _router: Router,
        private _http: HttpClient,
        @Inject('BASE_URL') baseUrl
    ) {
        this._url = baseUrl + 'api/products';
        this._productsSource = new ProductsListSource(_http, baseUrl);
    }

    public getProducts = (categoryId: number, page: number = 1): Observable<ProductsList> =>
        this._http.get<ProductsList>(`${this._url}/by-category/${categoryId}?page=${page}`)

    public getProduct = (id: number): Observable<ProductDetails> =>
        this._http.get<ProductDetails>(`${this._url}/${id}`)

    public postProduct = (value: Product): Observable<Product> =>
        this._http.post<Product>(`${this._url}`, value)

    public putProduct = (id: number, value: Product): Observable<Product> =>
        this._http.put<Product>(`${this._url}/${id}`, value)

    public deleteProduct = (item: Product): any =>
        this._http.delete(`${this._url}/${item.id}`)
            .subscribe(
                result => {
                    this.gotoList(item.categoryId);
                    window.location.reload();
                },
                error => console.log(error)
            )


    public gotoList(categoryId: number): void {
        this._router.navigate(['store', 'categories', categoryId]);
    }

    public gotoItem(categoryId: number, itemId: number): void {
        this._router.navigate(['store', 'categories', categoryId, 'products', itemId]);
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
    constructor(private http: HttpClient, private baseUrl: string) { }
    search = (term: string): Observable<{ name: string }[]> =>
        this.http.get<Product[]>(
            this.baseUrl + 'api/products/search',
            { params: new HttpParams().set('term', term) }
        )
}

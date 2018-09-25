import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { ProductDetails } from '../store.models';
import { ProductsService } from './products.service';

@Injectable()
export class ProductResolver implements Resolve<ProductDetails> {

    constructor(private _products: ProductsService) { }

    resolve = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductDetails> =>
        this._products.getProduct(+route.params['id'])
}

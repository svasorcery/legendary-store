import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Product } from '../store.models';
import { ProductsService } from './products.service';

@Component({
    selector: 'products-list',
    templateUrl: 'list.component.html'
})

export class ProductsListComponent implements OnInit {
    items: Product[];

    constructor(
        private _products: ProductsService,
        private _route: ActivatedRoute
    ) { }

    ngOnInit() { 
        this._route
            .params        
            .switchMap((params: Params) => this._products.getProducts(+params['id']))
            .subscribe(
                result => this.items = result,
                error => console.log(error)
            );
    }
}

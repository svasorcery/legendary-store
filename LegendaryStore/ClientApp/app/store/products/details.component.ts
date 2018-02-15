import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Product } from '../store.models';
import { ProductsService } from './products.service';

@Component({
    selector: 'product-details',
    templateUrl: 'details.component.html'
})

export class ProductDetsilsComponent implements OnInit {
    @Input() value: Product;

    constructor(
        private _products: ProductsService,
        private _route: ActivatedRoute
    ) { }
        
    ngOnInit() { 
        if (!this.value) {
            this._route
                .params
                .switchMap((params: Params) => this._products.getProduct(+params['id']))
                .subscribe(
                    result => this.value = result,
                    error => console.log(error)
                );
        }
    }
}
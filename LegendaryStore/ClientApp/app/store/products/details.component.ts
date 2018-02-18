import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Product } from '../store.models';
import { ProductsService } from './products.service';
import { CartService } from '../cart/cart.service';

@Component({
    selector: 'product-details',
    templateUrl: 'details.component.html'
})

export class ProductDetailsComponent implements OnInit {
    @Input() value: Product;

    constructor(
        private _products: ProductsService,
        private _cart: CartService,
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

    public addToCart() {
        if (!this.value) return;
        this._cart.addItem(this.value.id)
            .subscribe(
                result => console.log(`${result.product.name} added`),
                error => console.log(error)
            );
    }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { ProductsService } from './products.service';
import { Product } from '../store.models';

@Component({
    template: `
        <h3>New product</h3>
        <product-form 
            [value]="value" 
            (save)="submit($event)" 
            (cancel)="cancel()">
        </product-form>
    `
})

export class ProductCreateComponent implements OnInit {
    value: Product;
    categoryId: number;
    
    constructor(
        private _products: ProductsService,
        private _route: ActivatedRoute
    ) {
        this.value = new Product();
    }

    ngOnInit() { 
        this._route.params
            .subscribe(
                (params: Params) => this.categoryId = +params['categoryId']
            );
    }

    public submit(value: Product) {
        if (!value) return;

        this.value = value;
        this._products.postProduct(this.value)
            .subscribe(
                result => this._products.gotoList(this.categoryId),
                error => console.log(error)
            );
    }

    public cancel() {
        this._products.gotoList(this.categoryId);
    }
}

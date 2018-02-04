import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Product } from '../store.models';
import { ProductsService } from './products.service';

@Component({
    selector: 'product-edit',
    templateUrl: 'edit.component.html'
})

export class ProductEditComponent {
    value: Product;

    constructor(
        private _products: ProductsService,
        private _route: ActivatedRoute
    ) { }
        
    ngOnInit() { 
        this._route
            .params
            .switchMap((params: Params) => this._products.getProduct(+params['id']))
            .subscribe(
                result => this.value = result,
                error => console.log(error)
            );
    }

    public submit(): void {
        if (!this.value) return;

        this._products.putProduct(this.value.id, this.value)
            .subscribe(
                result => this._products.gotoList(this.value.categoryId),
                error => console.log(error)
            );
    }

    public cancel(): void {
        if (!this.value) return;

        this._products.gotoList(this.value.categoryId);
    }
}

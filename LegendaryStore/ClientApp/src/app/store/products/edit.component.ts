import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product, ProductDetails } from '../store.models';
import { ProductsService } from './products.service';

@Component({
    selector: 'product-edit',
    template: `
        <spinner [active]="!value"></spinner>
        <div *ngIf="value" class="col-md-offset-1 col-md-10">
            <h3>{{ value.name }}</h3>
            <product-form
                [value]="value"
                (save)="submit($event)"
                (cancel)="cancel()">
            </product-form>
        </div>
    `
})

export class ProductEditComponent implements OnInit {
    value: Product;

    constructor(
        private _products: ProductsService,
        private _route: ActivatedRoute
    ) { }

    ngOnInit() {
        this._route.data
            .subscribe(
                (data: { product: ProductDetails }) => this.value = data.product.product,
                error => console.log(error)
            );
    }

    public submit(): void {
        if (!this.value) { return; }

        this._products.putProduct(this.value.id, this.value)
            .subscribe(
                result => this._products.gotoList(this.value.categoryId),
                error => console.log(error)
            );
    }

    public cancel(): void {
        if (!this.value) { return; }

        this._products.gotoList(this.value.categoryId);
    }
}

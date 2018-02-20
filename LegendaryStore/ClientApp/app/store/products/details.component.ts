import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Product, Comment } from '../store.models';
import { ProductsService } from './products.service';
import { CommentsService } from '../comments/comments.service';
import { CartService } from '../cart/cart.service';

@Component({
    selector: 'product-details',
    templateUrl: 'details.component.html'
})

export class ProductDetailsComponent implements OnInit {
    @Input() value: Product;
    comments: Comment[];

    constructor(
        private _products: ProductsService,
        private _comments: CommentsService,
        private _cart: CartService,
        private _route: ActivatedRoute
    ) { }
        
    ngOnInit() { 
        if (!this.value) {
            this._route
                .params
                .switchMap((params: Params) => this._products.getProduct(+params['id']))
                .subscribe(
                    result => {
                        this.value = result;
                        this.getComments();
                    },
                    error => console.log(error)
                );
        } else {
            this.getComments();
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

    public getComments() {
        this._comments.getCommentsForProduct(this.value.id)
            .subscribe(
                result => this.comments = result,
                error => console.log(error)
            );
    }
}

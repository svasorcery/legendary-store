import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Product, ProductDetails, RatingRate } from '../store.models';
import { ProductsService } from './products.service';
import { CartService } from '../cart/cart.service';
import { FavoritesService } from '../favorites/favorites.service';
import { RatingsService } from '../ratings/ratings.service';

@Component({
    selector: 'product-details',
    templateUrl: 'details.component.html'
})

export class ProductDetailsComponent implements OnInit {
    @Input() value: ProductDetails;

    constructor(
        private _products: ProductsService,
        private _cart: CartService,
        private _favs: FavoritesService,
        private _ratings: RatingsService,
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
                    },
                    error => console.log(error)
                );
        }
    }

    public addToCart() {
        if (!this.value) return;
        this._cart.addItem(this.value.product.id)
            .subscribe(
                result => console.log(`${result.product.name} added`),
                error => console.log(error)
            );
    }

    public addToFavorites() {
        if (!this.value) return;
        this._favs.addItem(this.value.product.id)
            .subscribe(
                result => this.value.isFavorite = true,
                error => console.log(error)
            );
    }

    public removeFromFavorites() {
        if (!this.value) return;
        this._favs.removeItem(this.value.product.id)
            .subscribe(
                result => this.value.isFavorite = false,
                error => console.log(error)
            );
    }

    public rate(rate: number) {
        if (!rate || !(rate as RatingRate)) return;

        this._ratings.rateItem(this.value.product.id, rate)
            .subscribe(
                result => {
                    this._ratings.getTotalRate(this.value.product.id)
                        .subscribe(
                            result => { 
                                this.value.ratingTotal = result.rating;
                                this.value.isRated = true;
                            },
                            error => console.log(error)
                        )
                },
                error => console.log(error)
            );
    }
}

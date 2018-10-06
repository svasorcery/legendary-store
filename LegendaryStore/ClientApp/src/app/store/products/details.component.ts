import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductDetails, RatingRate } from '../store.models';
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
        private _cart: CartService,
        private _favs: FavoritesService,
        private _ratings: RatingsService,
        private _route: ActivatedRoute
    ) { }

    ngOnInit() {
        if (!this.value) {
            this._route.data
                .subscribe(
                    (data: { product: ProductDetails }) => this.value = data.product,
                    error => console.log(error)
                );
        }
    }

    public addToCart() {
        if (!this.value) { return; }
        this._cart.addItem(this.value.product.id);
    }

    public addToFavorites() {
        if (!this.value) { return; }
        this._favs.addItem(this.value.product.id)
            .subscribe(
                result => this.value.isFavorite = true,
                error => console.log(error)
            );
    }

    public removeFromFavorites() {
        if (!this.value) { return; }
        this._favs.removeItem(this.value.product.id)
            .subscribe(
                result => this.value.isFavorite = false,
                error => console.log(error)
            );
    }

    public rate(rate: number) {
        if (!rate || !(rate as RatingRate)) { return; }

        this._ratings.rateItem(this.value.product.id, rate)
            .subscribe(
                result => {
                    this._ratings.getTotalRate(this.value.product.id)
                        .subscribe(
                            rating => {
                                this.value.ratingTotal = rating.total;
                                this.value.ratingByUser = rating.byUser;
                            },
                            error => console.log(error)
                        );
                },
                error => console.log(error)
            );
    }

    public get ratingTotal() {
        return this.value.ratingByUser == null ?
            this.value.ratingTotal :
            this.value.ratingByUser;
    }
}

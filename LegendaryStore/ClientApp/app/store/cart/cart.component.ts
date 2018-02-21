import { Component, OnInit } from '@angular/core';

import { CartItem } from '../store.models';
import { CartService } from './cart.service';

@Component({
    selector: 'cart',
    templateUrl: 'cart.component.html'
})

export class CartComponent implements OnInit {
    items: CartItem[];

    constructor(private _cart: CartService) { }

    ngOnInit() { 
        this._cart.getItems()
            .subscribe(
                result => this.items = result,
                error => console.log(error)
            );
    }

    public removeItem(item: CartItem) {
        if (!item) return;

        if (confirm(`Вы действительно хотите удалить \'${item.product.name}\'?`)) {
            this._cart.removeItem(item.productId)
                .subscribe(
                    result => {
                        var index = this.items.indexOf(item);
                        this.items.splice(index, 1);
                    },
                    error => console.log(error)
                );
        }
    }
}

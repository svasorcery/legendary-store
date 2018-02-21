import { Component, OnInit } from '@angular/core';

import { Favorite } from '../store.models';
import { FavoritesService } from './favorites.service';

@Component({
    selector: 'favorites-list',
    templateUrl: 'list.component.html'
})

export class FavoritesListComponent implements OnInit {
    items: Favorite[];

    constructor(private _favs: FavoritesService) { }

    ngOnInit() { 
        this._favs.getItems()
            .subscribe(
                result => this.items = result,
                error => console.log(error)
            );
    }

    public removeItem(item: Favorite) {
        if (!item) return;
        if (confirm(`Вы действительно хотите удалить \'${item.product.name}\'?`)) {
            this._favs.removeItem(item.productId)
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

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import {  Product, Paging } from '../store.models';
import { ProductsService } from './products.service';

@Component({
    selector: 'products-list',
    templateUrl: 'list.component.html'
})

export class ProductsListComponent implements OnInit {
    items: Product[];
    categoryId: number;
    paging: Paging;
    sortBy: string = null;

    constructor(
        private _products: ProductsService,
        private _router: Router,
        private _route: ActivatedRoute,
    ) { }

    ngOnInit() {
        this._route
            .params
            .pipe(switchMap((params: Params) => {
                this.categoryId = +params['categoryId'];
                let page: number;
                this._route.queryParams.subscribe(queryParams => page = +queryParams['page']);
                return this._products.getProducts(this.categoryId, page);
            }))
            .subscribe(
                result => {
                    this.items = result.items;
                    this.paging = result.paging ?
                        Paging.getPaging(result.paging) :
                        new Paging(1, result.items.length, 10);
                },
                error => console.log(error)
            );
    }

    public selectItem(id: number) {
        this._products.gotoItem(this.categoryId, id);
    }

    public createItem() {
        this._products.gotoCreate(this.categoryId);
    }

    public editItem(id: number): void {
        this._products.gotoEdit(this.categoryId, id);
    }

    public deleteItem(item: Product) {
        if(!item) { return; }

        if (confirm(`Вы действительно хотите удалить \'${item.name}\'?`)) { 
            this._products.deleteProduct(item);
        }
    }


    public sort(kind: string) {
        this.items.sort(this.sortFn[kind]);
        this.sortBy = kind;
    }

    private sortFn = {
        name: function(a: Product, b: Product) {
            return a.name > b.name ? 1 : a.name < b.name ? -1 : 0;
        },
        price: function(a: Product, b: Product) {
            return a.price > b.price ? 1 : a.price < b.price ? -1 : 0;
        }
    };
}

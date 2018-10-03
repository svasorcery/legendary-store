import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { Product, IPager } from '../store.models';
import { ProductsService } from './products.service';
import { byAsc, byDesc } from '../../shared/sort.function';

@Component({
    selector: 'products-list',
    templateUrl: 'list.component.html'
})

export class ProductsListComponent implements OnInit {
    items: Product[];
    categoryId: number;
    paginationInfo: IPager;
    sortBy: string = null;
    sortAsc: boolean = true;

    constructor(
        private _products: ProductsService,
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
                    this.paginationInfo = result.paging /*?
                        Paging.getPaging(result.paging) :
                        new Paging(1, result.items.length, 10)*/;
                },
                error => console.log(error)
            );
    }

    public sort(key: string) {
        this.sortAsc = !this.sortBy || key === this.sortBy ? !this.sortAsc : true;
        this.sortBy = key;
        this.items.sort(this.sortAsc ? byAsc(key) : byDesc(key));
    }

    public onPageChanged(value: any): any {
        event.preventDefault();
        this.paginationInfo.actualPage = value;
        this._products.getProducts(this.categoryId, value).subscribe(
            result => {
                this.items = result.items;
                this.paginationInfo = result.paging /*?
                    Paging.getPaging(result.paging) :
                    new Paging(1, result.items.length, 10)*/;
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
        if (!item) { return; }

        if (confirm(`Вы действительно хотите удалить \'${item.name}\'?`)) {
            this._products.deleteProduct(item);
        }
    }
}

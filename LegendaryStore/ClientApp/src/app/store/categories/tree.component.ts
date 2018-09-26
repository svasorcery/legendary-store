import { Component, OnInit } from '@angular/core';

import { CategoryMenuItem } from '../store.models';
import { CategoriesService } from './categories.service';

@Component({
    selector: 'categories-tree',
    template: `
        <spinner [active]="!items"></spinner>
        <tree-menu [items]="items"></tree-menu>
    `
})

export class CategoriesTreeComponent implements OnInit {
    items: CategoryMenuItem[];

    constructor(private _categories: CategoriesService) { }

    ngOnInit() {
        this._categories.getRootCategoriesChildsTree()
        .subscribe(
            result => this.items = result,
            error => console.log(error)
        );
    }
}

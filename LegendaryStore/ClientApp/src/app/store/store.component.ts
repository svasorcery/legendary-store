import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'store',
    template: `
        <h2>
            Legendary Store's catalog
            <button (click)="showCart()" class="btn btn-default pull-right">
                <i class="fa fa-shopping-cart"></i> Cart
            </button>
        </h2>

        <modal [visible]="modal"
            [closable]="true"
            [header]="'Cart'"
            (visibleChange)="hideCart()">
            <cart></cart>
        </modal>

        <router-outlet></router-outlet>
    `
})

export class StoreComponent implements OnInit {
    modal: boolean;

    public showCart () {
        this.modal = true;
    }

    public hideCart() {
        this.modal = false;
    }

    constructor() { }

    ngOnInit() { }
}

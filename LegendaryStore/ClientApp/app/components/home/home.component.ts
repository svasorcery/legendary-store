import { Component, OnInit } from '@angular/core';

import { UserService } from '../../user.service';
import { UserInfo } from '../../app.models';

import { ProductsService } from '../../store/products/products.service';
import { Product } from '../../store/store.models';

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
    userInfo: UserInfo;
    product: Product;

    constructor(
        private _user: UserService,
        public products: ProductsService
    ) { }

    ngOnInit() {
        this._user.WhoAmI()
            .subscribe(
                result => this.userInfo = result,
                error => console.log(error)
            );
    }
}

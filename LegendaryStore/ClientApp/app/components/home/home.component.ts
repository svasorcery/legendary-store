import { Component } from '@angular/core';

import { ProductsService } from '../../store/products/products.service';
import { Product } from '../../store/store.models';

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent {
    product: Product;

    constructor(public products: ProductsService) {

    }
}

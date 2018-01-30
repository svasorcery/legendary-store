import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { StoreRoutingModule, storeComponents } from './store.routing';
import { CategoriesService } from './categories/categories.service';
import { ProductsService } from './products/products.service';


@NgModule({
    imports: [
        HttpModule,
        FormsModule,
        SharedModule,
        StoreRoutingModule
    ],
    declarations: [
        ...storeComponents
    ],
    providers: [
        CategoriesService,
        ProductsService
    ],
    exports: [
        ...storeComponents
    ],
})
export class StoreModule { 

}
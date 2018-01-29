import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoreComponent } from './store.component';
import { CategoriesTreeComponent } from './categories/tree.component';
import { ProductsListComponent } from './products/list.component';

const routes: Routes = [
    { 
        path: 'store', 
        component: StoreComponent,
        children: [
            { path: 'categories', component: CategoriesTreeComponent },
            { path: 'categories/:id', component: ProductsListComponent }
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ],
})
export class StoreRoutingModule { }

export const storeComponents = [
    StoreComponent,
    CategoriesTreeComponent,
    ProductsListComponent
];

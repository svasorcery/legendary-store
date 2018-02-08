import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoreComponent } from './store.component';
import { CategoriesTreeComponent } from './categories/tree.component';
import { ProductsListComponent } from './products/list.component';
import { ProductDetsilsComponent } from './products/details.component';
import { ProductFormComponent } from './products/form.component';
import { ProductEditComponent } from './products/edit.component';
import { ProductCreateComponent } from './products/create.component';

const routes: Routes = [
    { 
        path: 'store', 
        component: StoreComponent,
        children: [
            { path: 'categories', component: CategoriesTreeComponent },
            { path: 'categories/:categoryId', component: ProductsListComponent },
            { path: 'categories/:categoryId/products/create', component: ProductCreateComponent },
            { path: 'categories/:categoryId/products/:id', component: ProductDetsilsComponent },
            { path: 'categories/:categoryId/products/:id/edit', component: ProductEditComponent }
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
export class StoreRoutingModule { 
    
}

export const storeComponents = [
    StoreComponent,
    CategoriesTreeComponent,
    ProductsListComponent,
    ProductDetsilsComponent,
    ProductFormComponent,
    ProductEditComponent,
    ProductCreateComponent
];

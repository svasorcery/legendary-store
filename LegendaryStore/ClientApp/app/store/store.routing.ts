import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoreComponent } from './store.component';
import { CartComponent } from './cart/cart.component';
import { CategoriesTreeComponent } from './categories/tree.component';
import { ProductsListComponent } from './products/list.component';
import { ProductDetailsComponent } from './products/details.component';
import { ProductFormComponent } from './products/form.component';
import { ProductEditComponent } from './products/edit.component';
import { ProductCreateComponent } from './products/create.component';
import { CommentsComponent } from './comments/comments.component';
import { CommentsListComponent } from './comments/list.component';
import { CommentCreateComponent } from './comments/create.component';

const routes: Routes = [
    { 
        path: 'store', 
        component: StoreComponent,
        children: [
            { path: 'cart', component: CartComponent },
            { path: 'categories', component: CategoriesTreeComponent },
            { path: 'categories/:categoryId', component: ProductsListComponent },
            { path: 'categories/:categoryId/products/create', component: ProductCreateComponent },
            { path: 'categories/:categoryId/products/:id', component: ProductDetailsComponent },
            { path: 'categories/:categoryId/products/:id/edit', component: ProductEditComponent },
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
    CartComponent,
    CategoriesTreeComponent,
    ProductsListComponent,
    ProductDetailsComponent,
    ProductFormComponent,
    ProductEditComponent,
    ProductCreateComponent,
    CommentsComponent,
    CommentsListComponent,
    CommentCreateComponent
];

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
import { FavoritesListComponent } from './favorites/list.component';

import { CategoryResolver } from './categories/categories.resolver';
import { ProductResolver } from './products/products.resolver';

const routes: Routes = [
    {
        path: 'store',
        component: StoreComponent,
        children: [
            { path: 'cart', component: CartComponent },
            { path: 'favorites', component: FavoritesListComponent },
            {
                path: 'categories',
                children: [
                    {
                        path: '',
                        component: CategoriesTreeComponent
                    },
                    {
                        path: ':categoryId',
                        resolve: { category: CategoryResolver },
                        data: { breadcrumb: { key: 'category', values: ['name'] } },
                        children: [
                            {
                                path: '',
                                component: ProductsListComponent
                            },
                            {
                                path: 'products/create',
                                component: ProductCreateComponent
                            },
                            {
                                path: 'products/:id',
                                resolve: { product: ProductResolver },
                                data: { breadcrumb: { key: 'product', values: ['product.name'] } },
                                children: [
                                    {
                                        path: '',
                                        component: ProductDetailsComponent
                                    },
                                    {
                                        path: 'edit',
                                        component: ProductEditComponent
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
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
    CommentCreateComponent,
    FavoritesListComponent
];

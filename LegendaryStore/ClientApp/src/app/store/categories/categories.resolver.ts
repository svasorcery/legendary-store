import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { Category } from '../store.models';
import { CategoriesService } from './categories.service';

@Injectable()
export class CategoryResolver implements Resolve<Category> {

    constructor(private _categories: CategoriesService) { }

    resolve = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Category> =>
        this._categories.getCategory(+route.params['categoryId'])
}

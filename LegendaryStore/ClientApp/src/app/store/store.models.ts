import { IPager } from '../shared/pager.component';
export { IPager } from '../shared/pager.component';

export class CategoryMenuItem {
    id: number;
    name: string;
    parentId?: number;
    children: CategoryMenuItem[];
}

export class Category {
    id: number;
    name: string;
}

export class Product {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    imageUrl: string;
    categoryId: number;
    category: Category;
}

export class ProductDetails {
    product: Product;
    isFavorite: boolean;
    ratingTotal: number;
    ratingByUser: RatingRate;
}

export class ProductsList {
    categoryName: string;
    items: Product[];
    paging: IPager;
}

export class Favorite {
    id: number;
    productId: number;
    product: Product;
    userName: string;
    addedAt: Date;
}

export class Rating {
    id: number;
    productId: number;
    product: Product;
    userName: string;
    rate: RatingRate;
    ratedAt: Date;
}

export enum RatingRate {
    poor = 1,
    fair = 2,
    average = 3,
    good = 4,
    excellent = 5
}

export class Comment {
    id: number;
    productId: number;
    content: string;
    author: string;
    postedAt: Date;
    isDeleted: boolean;
}

export class CartItem {
    constructor(
        public id: number,
        public productId: number,
        public product: Product,
        public quantity: number,
        public pricePerUnit: number,
        public priceCalculatedAt: number
    ) { }

    public get priceTotal(): number {
        return this.quantity * this.pricePerUnit;
    }
}

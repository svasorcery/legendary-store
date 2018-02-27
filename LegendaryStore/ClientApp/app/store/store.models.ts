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
    paging: Paging;
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

export class Paging {
    public totalPages: number;

    constructor(
        public page: number,
        public totalItems: number,
        public itemsPerPage: number,
        totalPages?: number
    ) { 
        this.totalPages = totalPages ? totalPages : this.totalItems / this.itemsPerPage;
    }

    public get pages(): number[] {
        var pages = []; 
        for (var i = 1; i <= this.totalPages; i++) { 
            pages.push(i); 
        }
        return pages;
    }

    public static getPaging(p: Paging) {
        var result = new Paging(p.page, p.totalItems, p.itemsPerPage, p.totalPages);
        return result;
    }
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

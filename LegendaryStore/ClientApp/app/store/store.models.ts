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

export class ProductsList {
    categoryName: string;
    items: Product[];
    paging: Paging;
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
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

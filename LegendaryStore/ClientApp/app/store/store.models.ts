export class CategoryMenuItem {
    id: number;
    name: string;
    parentId?: number;
    children: CategoryMenuItem[];
}

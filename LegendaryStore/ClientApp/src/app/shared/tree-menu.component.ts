import { Component, Input } from '@angular/core';

export interface ITreeMenuItem {    
    id: number;
    name: string;
    parentId?: number;
    children: ITreeMenuItem[];
}


@Component({
    selector: 'tree-menu',
    template: `
        <ul *ngIf="roots">
            <li *ngFor="let root of roots">
                <tree-menu-item [item]="root"></tree-menu-item>
            </li>
        </ul>
    `
})
export class TreeMenuComponent {
    @Input('items') roots: ITreeMenuItem[];
}


@Component({
    selector: 'tree-menu-item',
    template: `
        <a [routerLink]="item.id">{{ item.name }}</a>
        <ul *ngIf="item.children">
            <li *ngFor="let child of item.children">
                <tree-menu-item 
                    [item]="child">
                </tree-menu-item>
            </li>
        </ul>
    `
})
export class TreeMenuItemComponent {
    @Input() item: ITreeMenuItem;
}

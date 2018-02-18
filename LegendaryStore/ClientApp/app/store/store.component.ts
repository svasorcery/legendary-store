import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'store',
    template: `
        <h2>Legendary Store's catalog</h2>
        <router-outlet></router-outlet>
    `
})

export class StoreComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}
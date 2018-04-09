import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Product } from '../store.models';

@Component({
    selector: 'product-form',
    templateUrl: 'form.component.html',
    styles: [`
        .alert-sm {
            padding: 5px 15px;
        }
    `]
})

export class ProductFormComponent {
    @Input() value: Product;
    @Output('save') onSave: EventEmitter<Product> = new EventEmitter();
    @Output('cancel') onCancel: EventEmitter<boolean> = new EventEmitter();

    constructor() { }

    public submit(): void {
        if (!this.value) return;

        this.onSave.emit(this.value);
    }

    public cancel(): void {
        this.onCancel.emit(true);
    }

    public addImage(url: string) {
        if (!url) return;
        this.value.imageUrl = url;
    }

    public removeImage(): void {
        if (!this.value.imageUrl) return;
        if (!confirm(`Are you sure want to remove product image?`)) return;
        this.value.imageUrl = null;
    }
}
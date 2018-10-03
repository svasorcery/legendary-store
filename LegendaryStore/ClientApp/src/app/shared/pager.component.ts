import { Component, OnChanges, Output, Input, EventEmitter } from '@angular/core';

export interface IPager {
    itemsPage: number;
    totalItems: number;
    actualPage: number;
    totalPages: number;
    items: number;
}

@Component({
    selector: 'pager',
    template: `

        <div aria-label="Page navigation" style="text-align:center">
            <ul class="pagination" *ngIf="model" style="cursor:pointer">
                <li>
                    <a (click)="onPreviousCliked($event)" [class.disabled]="buttonStates?.previousDisabled" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <!--<li *ngFor="let pageNum of model.pages" [ngClass]="{ active: pageNum === paging.page }">
                    <a [routerLink]="[]" [queryParams]="{ page: pageNum }">{{ pageNum }}</a>
                </li>-->
                <li>
                    <a (click)="onNextClicked($event)" [class.disabled]="buttonStates?.nextDisabled" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
            <div>
                Showing {{ model?.items }} of {{ model?.totalItems }} products - 
                Page {{ model?.actualPage }} - {{ model?.totalPages }}
            </div>
        </div>
    `,
    styles: [`
        .disabled {
            opacity: 0;
            pointer-events: none;
        }
    `]
})
export class PagerComponent implements OnChanges  {
    @Input() model: IPager;
    @Output() changed: EventEmitter<number> = new EventEmitter<number>();

    buttonStates: any = {
        nextDisabled: true,
        previousDisabled: true,
    };

    ngOnChanges() {
        if (this.model) {
            this.model.items = (this.model.itemsPage > this.model.totalItems) ? this.model.totalItems : this.model.itemsPage;

            this.buttonStates.previousDisabled = (this.model.actualPage === 1);
            this.buttonStates.nextDisabled = (this.model.actualPage === this.model.totalPages);
        }
    }

    public onNextClicked(event: any): void {
        event.preventDefault();
        this.changed.emit(this.model.actualPage + 1);
    }

    public onPreviousCliked(event: any): void {
        event.preventDefault();
        this.changed.emit(this.model.actualPage - 1);
    }
}

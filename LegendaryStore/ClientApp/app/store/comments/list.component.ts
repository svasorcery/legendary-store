import { Component, OnInit, Input } from '@angular/core';

import { Comment } from '../store.models';
import { CommentsService } from './comments.service';

@Component({
    selector: 'comments-list',
    //templateUrl: 'tree.component.html'
    template: `
        <h3>Comments ({{ items ? items.length : 0 }})</h3>
        <div *ngIf="items" class="col-md-6">
            <div *ngFor="let c of items" class="panel panel-default">
                <div class="panel-heading">
                    <span><b>{{ c.author }}</b> at {{ c.postedAt | date:'yyyy-MM-dd HH:mm:ss' }}</span>
                    <span class="pull-right" style="cursor:pointer"><a>#{{ c.id }}</a></span>
                </div>
                <div class="panel-body">
                    {{ c.content }}
                </div>
            </div>
        </div>
    `
})

export class CommentsListComponent implements OnInit {
    @Input() items: Comment[] = [];

    constructor() { }

    ngOnInit() { }
}

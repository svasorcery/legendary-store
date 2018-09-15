import { Component, Input, OnInit } from '@angular/core';

import { Comment } from '../store.models';
import { CommentsService } from '../comments/comments.service';

@Component({
    selector: 'comments',
    template: `
        <div class="col-md-6">
            <h3>Comments ({{ comments ? comments.length : 0 }})</h3>
            <comments-list [items]="comments"></comments-list>
            <comment-create (post)="postComment($event)"></comment-create>
        </div>
    `
})

export class CommentsComponent implements OnInit {
    @Input() productId: number;
    comments: Comment[];

    constructor(private _comments: CommentsService) { }

    ngOnInit() { 
        this._comments.getCommentsForProduct(this.productId)
            .subscribe(
                result => this.comments = result,
                error => console.log(error)
            );
    }

    public postComment(content: string) {
        this._comments.postComment(this.productId, content)
            .subscribe(
                result => this.comments.push(result),
                error => console.log(error)
            );
    }
}

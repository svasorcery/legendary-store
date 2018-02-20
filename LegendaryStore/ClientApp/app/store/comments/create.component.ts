import { Component, Output, EventEmitter } from '@angular/core';

import { Comment } from '../store.models';
import { CommentsService } from './comments.service';

@Component({
    selector: 'comment-create',
    template: `
        <form #form="ngForm" novalidate (submit)="submit()">
            <fieldset class="form-group">
                <label for="comment" class="control-label">Your comment</label>
                <textarea 
                    [(ngModel)]="comment" 
                    required
                    minlength="5"
                    maxlength="500"
                    rows="5"
                    placeholder="Enter your message"
                    name="comment"
                    class="form-control">
                </textarea>
            </fieldset>
            <div class="form-group">
                <button type="submit" 
                    [disabled]="form.invalid" 
                    class="btn btn-primary pull-right">
                        <i class="fa fa-paper-plane"></i> 
                        Send
                </button>
                <a (click)="cancel()" class="btn btn-default">Clear</a>
            </div>
        </form>
    `
})
export class CommentCreateComponent {
    comment: string;

    @Output('post') onSubmit: EventEmitter<string>;

    constructor(private _comments: CommentsService) { 
        this.clear();
        this.onSubmit = new EventEmitter();
    }

    public submit(): void {
        if (!this.comment) return;

        this.onSubmit.emit(this.comment);
        this.clear();
    }

    public clear(): void {
        this.comment = '';
    }
}

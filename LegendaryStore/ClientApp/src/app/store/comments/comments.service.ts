import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Comment } from '../store.models';

@Injectable()
export class CommentsService {
    private _url: string;

    constructor(
        private _http: HttpClient,
        @Inject('BASE_URL') baseUrl
    ) {
        this._url = baseUrl + 'api/comments';
    }

    public getCommentsForProduct = (productId: number): Observable<Comment[]> =>
        this._http.get<Comment[]>(`${this._url}/${productId}`)

    public postComment = (productId: number, content: string): Observable<Comment> =>
        this._http.post<Comment>(`${this._url}/${productId}`, { content: content })
}

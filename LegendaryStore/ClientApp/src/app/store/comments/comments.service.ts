import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

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
            .delay(1000); // emulate remote server data fetching latency

    public postComment = (productId: number, content: string): Observable<Comment> =>
        this._http.post<Comment>(`${this._url}/${productId}`, { content: content });
}

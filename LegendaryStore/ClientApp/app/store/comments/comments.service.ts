import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';

import { Comment } from '../store.models';

@Injectable()
export class CommentsService {
    private _url: string;

    constructor(
        private _http: Http,
        @Inject('BASE_URL') baseUrl
    ) { 
        this._url = baseUrl + 'api/comments';
    }
    
    public getCommentsForProduct(productId: number): Observable<Comment[]> {
        return this._http.get(`${this._url}/${productId}`)
            .delay(1000) // emulate remote server data fetching latency
            .map((response: Response) => response.json() as Comment[])
    }
}

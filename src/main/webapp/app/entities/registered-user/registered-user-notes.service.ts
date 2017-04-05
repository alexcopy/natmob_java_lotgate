import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, BaseRequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { RegisteredUserNotes } from './registered-user-notes.model';
@Injectable()
export class RegisteredUserNotesService {

    private resourceUrl = 'pondnotes/api/registered-users';
    private resourceSearchUrl = 'pondnotes/api/_search/registered-users';

    constructor(private http: Http) { }

    create(registeredUser: RegisteredUserNotes): Observable<RegisteredUserNotes> {
        let copy: RegisteredUserNotes = Object.assign({}, registeredUser);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(registeredUser: RegisteredUserNotes): Observable<RegisteredUserNotes> {
        let copy: RegisteredUserNotes = Object.assign({}, registeredUser);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<RegisteredUserNotes> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            return res.json();
        });
    }

    query(req?: any): Observable<Response> {
        let options = this.createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
        ;
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    search(req?: any): Observable<Response> {
        let options = this.createRequestOption(req);
        return this.http.get(this.resourceSearchUrl, options)
        ;
    }


    private createRequestOption(req?: any): BaseRequestOptions {
        let options: BaseRequestOptions = new BaseRequestOptions();
        if (req) {
            let params: URLSearchParams = new URLSearchParams();
            params.set('page', req.page);
            params.set('size', req.size);
            if (req.sort) {
                params.paramsMap.set('sort', req.sort);
            }
            params.set('query', req.query);

            options.search = params;
        }
        return options;
    }
}

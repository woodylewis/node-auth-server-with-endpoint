import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ErrorService {
    constructor() { }

    public handleError(error: HttpResponse<any>): any {
        let msgText: string = error['message'] ? ' - ' + error['message'] : '';
        console.log(error.status + ': ' + error.statusText + msgText);

        return Observable.throw(error);
    }
}
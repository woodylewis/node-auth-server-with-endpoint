import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { URLSearchParams, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ErrorService } from './error.service';
import { Registrant } from '../models/registrant';
import { Login } from '../models/login';
import 'rxjs/add/operator/catch';

@Injectable()
export class DataService {
    public apiGateway = 'http://localhost:3000/auth/login';
    private registerUrl = 'http://localhost:3000/auth/register';

    constructor(private http: HttpClient, private error: ErrorService) { }

    public login(login: Login): Observable<any> {
        return this.http.post(this.apiGateway, JSON.stringify(login))
            .catch((res: HttpResponse<any>) => this.error.handleError(res));
    }

    public register(registrant: Registrant): Observable<any> {
        return this.http.post(this.registerUrl, JSON.stringify(registrant))
            .catch((res: HttpResponse<any>) => this.error.handleError(res));
    }
}
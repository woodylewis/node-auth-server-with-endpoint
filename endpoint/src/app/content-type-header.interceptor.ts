import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ContentTypeHeaderInterceptor implements HttpInterceptor {

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const clone: any = req.clone({ setHeaders: { 'Content-Type': 'application/json; charset=utf-8' } });
        return next.handle(clone);
    }

}

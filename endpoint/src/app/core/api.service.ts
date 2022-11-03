import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { DataService } from './data.service';
import { Router } from '@angular/router';

@Injectable()
export class ApiService {

    constructor(private dataService: DataService, private router: Router) { }

    public getPassenger(passenger): Observable<any> {
        let source: Observable<any> = Observable.create((observer: Observer<any>) => {
            this.dataService.login(passenger)
            .subscribe((data) => { 
                if(data.auth === "false") {
                    observer.next({ passengerRecord : "false"});
                } else {
                    observer.next({ passengerRecord : data.theResponse});
                }
            });
        });
        return source;
    }

    public registerPassenger(registrant): Observable<any> {
        let source: Observable<any> = Observable.create((observer: Observer<any>) => {
            this.dataService.register(registrant)
            .subscribe((data) => {
                console.log('api service ' + data);
                observer.next({ passengerRecord : data });
            });
        });
        return source;
    }
}




import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class DisplayService {
    public stream = new Subject<any>();
    public displayObj;

    constructor() { }

    public init(theObj: any): void {
        this.displayObj = Object.assign({}, theObj);
    }
    public show(): void {
        this.stream.next(this.displayObj['passengerRecord']);
    }
}

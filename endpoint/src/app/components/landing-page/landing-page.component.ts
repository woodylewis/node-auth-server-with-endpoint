import { NgModule } from '@angular/core';
import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { DisplayService } from './../../core/display.service';

@Component({
  selector: 'landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.css'] 
})
export class LandingPageComponent implements OnInit, OnDestroy {
    public displaySubscription: Subscription;
    public passengerRecord = {};
    public foundRecord = true;

    constructor(private displayService: DisplayService, private router: Router) { }
  
    public ngOnInit() {
        this.displaySubscription = this.displayService.stream
        .subscribe((displayObj: any) => {
            //if (displayObj === "false") {
            if (!displayObj) {
                this.foundRecord = false;
            } else {
                this.passengerRecord = Object.assign({}, displayObj.passenger, displayObj.token);
                this.passengerRecord['token'] = displayObj.token;
                this.passengerRecord['rule'] = displayObj.rule;
            }
            
        });
        this.displayService.show();
    }

    public ngOnDestroy() {
        this.displaySubscription.unsubscribe();
    }

    public logOut() {
        this.router.navigateByUrl('/login-form');
    }
}
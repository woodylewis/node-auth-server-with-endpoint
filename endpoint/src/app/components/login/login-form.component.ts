import { NgModule } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Passenger } from '../../models/passenger';
import { ApiService } from './../../core/api.service';
import { DisplayService } from './../../core/display.service';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent implements OnInit {
  constructor(private apiService: ApiService, private displayService: DisplayService,
              private router: Router) { }

  public passenger = new Passenger('', '');
  
  ngOnInit() {}

  onSubmit(form: any): void {
      this.apiService.getPassenger(this.passenger)
      .subscribe((data) => {
        this.displayService.init(data);
        this.router.navigateByUrl('/landing-page');
      });
  }
}

import { NgModule } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Registrant } from '../../models/registrant';
import { ApiService } from './../../core/api.service';
import { DisplayService } from './../../core/display.service';

@Component({
  selector: 'register-form',
  templateUrl: './register-form.component.html',
})
export class RegisterFormComponent implements OnInit {
  constructor(private apiService: ApiService, private router: Router) { }

  public registrant = new Registrant("", "", "", "", "", "", "", 0);
  
  ngOnInit() {}

  onSubmit(form: any): void {
      this.apiService.registerPassenger(this.registrant)
      .subscribe((data) => {
        console.log(data);
        this.router.navigateByUrl('/login');
      });
  }
}

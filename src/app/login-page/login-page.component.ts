import { Component } from '@angular/core';
import { RouterLink,RouterOutlet } from '@angular/router';
import { ItemServiceService } from '../../../service/item-service.service';
import { NgIf } from '@angular/common';
import { FormControl,FormGroup,ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-login-page',
  imports: [RouterLink,RouterOutlet,NgIf,ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
  standalone:true
})
export class LoginPageComponent {
  loading:boolean = true;
  confirmed:boolean = false;
  notConfirmed:boolean = false;
  service:ItemServiceService;
  applyForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(service:ItemServiceService){
    this.service = service;
  }

  login(){
    this.loading = true;
    this.confirmed = false;
    this.notConfirmed = false;
    this.service.login(
      this.applyForm.value.email ?? '',
      this.applyForm.value.password ?? ''
    ).subscribe(result => {
      if(result){
        this.loading = false;
        this.confirmed = true;
      }else{
        this.loading = false;
        this.notConfirmed = true;
      }
    })
  }
}

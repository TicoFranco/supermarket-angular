import { Component, OnInit } from '@angular/core';
import { RouterLink,RouterOutlet} from '@angular/router';
import { PurchaseComponent } from './purchase/purchase.component';
import { FormControl,FormGroup,ReactiveFormsModule} from '@angular/forms';
import { ItemServiceService } from '../../../service/item-service.service';
import { CommonModule } from '@angular/common';
import { UserInterface } from '../../../service/UserInterface';
import { purchaseInterface } from '../../../service/PurchaseInterface';

@Component({
  selector: 'app-user-page',
  imports: [RouterLink,RouterOutlet,PurchaseComponent,ReactiveFormsModule,CommonModule],
  templateUrl: './user-page.component-1.html',
  styleUrl: './user-page.component.css',
  standalone:true
})
export class UserPageComponent implements OnInit{
  user:UserInterface = {
    email:'',
    firstName:'',
    lastName:'',
    orders:[],
    userRole:''
  };

  Myaccount:boolean=true;
  Mypurchases:boolean=false;

  orders:purchaseInterface[] = [];

  users:boolean=false;
  foods:boolean=true;

  applyFood = new FormGroup({
    name:new FormControl(''),
    type:new FormControl(''),
    price:new FormControl(''),
    image:new FormControl(null)
  })
  applyUser = new FormGroup({
    email:new FormControl('')
  })
  
  service:ItemServiceService;

  constructor(s:ItemServiceService){
    this.service = s;
  }

  ngOnInit(): void {
    this.service.currentUser.subscribe({
      next: user => this.user = user
    });
    if(this.user.userRole === 'USER'){
      this.service.getOrders()?.subscribe({
        next:orders => this.orders=orders
      })
    }
  }

  changeSessionUser(){
    if(this.Myaccount){
      this.Myaccount=false;
      this.Mypurchases=true;
    }else{
      this.Mypurchases=false;
      this.Myaccount=true;
    }
  }

  changeSessionAdmin(){
    if(this.foods){
      this.foods = false;
      this.users = true;
    }else{
      this.foods = true;
      this.users = false;
    }
  }

  findFood(){
  }

  postFood(){

  }

  deleteFood(){

  }

  foundUser(){

  }

  deleteUser(){

  }
}

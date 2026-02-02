import { Component, Input, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { purchaseInterface } from '../../../../service/PurchaseInterface';

@Component({
  selector: 'app-purchase',
  imports: [NgFor],
  templateUrl: './purchase.component.html',
  styleUrl: './purchase.component.css',
  standalone:true
})
export class PurchaseComponent implements OnInit{
  
  purchaseId:string = '';
  collapseId:string = '';
  purchaseDB:string = '';
  collapseDB:string = '';

  @Input() purchase:purchaseInterface = {date:'',total:0,items:[]};
  @Input() purchaseIndex:number = 0;

  ngOnInit(): void {
    this.purchase.date = this.formatDate(this.purchase.date);
    this.purchaseId = `purchase${this.purchaseIndex}`;
    this.collapseId = `collapse${this.purchaseIndex}`;
    this.purchaseDB = `#purchase${this.purchaseIndex}`;
    this.collapseDB = `#collapse${this.purchaseIndex}`;
    console.log(this.purchase);
  }

  formatDate(date:string){
    const firstPart:string = date.slice(0,10).replace("-","/");
    const secondPart:string = date.slice(11,19);
    return firstPart+' '+secondPart;
  }
}

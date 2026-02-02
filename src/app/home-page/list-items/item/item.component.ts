import { Component, EventEmitter, Input, Output} from '@angular/core';
import { ItemInterface } from '../../../../../service/ItemInterface';
import { purchaseItem } from '../../../../../service/PurchaseInterface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item',
  imports: [CommonModule],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent {

   count:number=0;
   total_item:number=0;
   @Output() outputHorizontal=new EventEmitter<number>();
   @Output() outputVertical=new EventEmitter<ItemInterface>();
   @Output() destroy=new EventEmitter<void>();
   @Input() item!: ItemInterface;
   @Input() mod!:string;

   ngOnInit(): void{
    if(this.mod == 'horizontal'){
      this.count=1;
      this.total_item=this.item.price;
      this.outputHorizontal.emit(this.item.price);
    }
  }

  retirar_item(){
    if(this.count > 0){
      this.count--;
      this.total_item=this.item.price*this.count;
      this.outputHorizontal.emit(this.item.price*(-1));
    }
  }

  adicionar_item(){
    this.count++;
    this.total_item=this.item.price*this.count;
    this.outputHorizontal.emit(this.item.price);
  }

  deleteItem(){
    this.destroy.emit();
  }

  getInfoBuy(){
      const info:purchaseItem = {
        id:this.item.id,
        count:this.count
      }
      return info;
  }

  //item -> list-items -> home-page -> menu-bar
  goToCart(){
    this.outputVertical.emit(this.item);
  }
}

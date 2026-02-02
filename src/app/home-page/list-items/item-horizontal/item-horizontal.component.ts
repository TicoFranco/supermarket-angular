import { Component,OnInit,Input,Output, EventEmitter} from '@angular/core';
import { ItemInterface } from '../../../../../service/ItemInterface';
import { NgIf } from '@angular/common';
import { purchaseItem } from '../../../../../service/PurchaseInterface';
import { ItemManipulationInterface } from '../../../../../service/ItemManipulationInterface';

@Component({
  selector: 'app-item-horizontal',
  imports: [NgIf],
  templateUrl: './item-horizontal.component.html',
  styleUrl: './item-horizontal.component.css'
})
export class ItemHorizontalComponent {
  count:number=0;
  total_item:number=0;
  @Output() message=new EventEmitter<ItemManipulationInterface>();
  @Output() destroy=new EventEmitter<void>();
  @Input() item!: ItemInterface;

  ngOnInit(): void{
      this.count=1;
      this.total_item=this.item.price;
      this.message.emit({
        price:this.item.price,
        count:this.count
      });
  }

  retirar_item(){
    if(this.count > 0){
      this.count--;
      this.total_item=this.item.price*this.count;
      this.message.emit({
        price:this.item.price*(-1),
        count:-1
      });
    }
  }

  adicionar_item(){
    this.count++;
    this.total_item=this.item.price*this.count;
    this.message.emit({
      price:this.item.price,
      count:1
    });
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

}

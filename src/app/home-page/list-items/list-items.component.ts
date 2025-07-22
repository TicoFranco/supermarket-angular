import { Component, EventEmitter, Output} from '@angular/core';
import { NgIf } from '@angular/common';
import { ItemVerticalComponent } from './item-vertical/item-vertical.component';

@Component({
  selector: 'app-list-items',
  imports: [NgIf,ItemVerticalComponent],
  templateUrl: './list-items.component.html',
  styleUrl: './list-items.component.css',
  standalone:true
})
export class ListItemsComponent {
  abaAtiva:string = 'carnes';
  itemId:number | undefined= undefined;
  @Output() message=new EventEmitter<number>();

  ativarAba(aba: string) {
   this.abaAtiva = aba;
  }

  goToCart(){
    this.message.emit(this.itemId);
  }

  //itemVertical -> list-items -> home-page -> menu-bar
  getMessage(n:number){
    this.itemId=n;
    this.goToCart();
  }

}

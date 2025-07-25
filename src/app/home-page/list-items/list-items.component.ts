import { Component, EventEmitter, Output,OnInit} from '@angular/core';
import { NgIf,NgStyle,NgFor } from '@angular/common';
import { ItemVerticalComponent } from './item-vertical/item-vertical.component';
import { list_items } from '../../data/data_list';

@Component({
  selector: 'app-list-items',
  imports: [NgIf,ItemVerticalComponent,NgStyle,NgFor],
  templateUrl: './list-items.component.html',
  styleUrl: './list-items.component.css',
  standalone:true
})
export class ListItemsComponent {
  abaAtiva:string = 'carnes';
  itemId:number | undefined= undefined;
  @Output() message=new EventEmitter<number>();
  idBebidas:number[]=[];
  idCarnes:number[]=[];
  idMassas:number[]=[];
  idDoces:number[]=[];

   ngOnInit(): void{
        let aux=list_items.filter(item => item.tipo === "bebida");
        this.idBebidas=aux.map(item => item.id);
        aux=list_items.filter(item => item.tipo === "carne");
        this.idCarnes=aux.map(item => item.id);
        aux=list_items.filter(item => item.tipo === "massa");
        this.idMassas=aux.map(item => item.id);
        aux=list_items.filter(item => item.tipo === "doce");
        this.idDoces=aux.map(item => item.id);
    }

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

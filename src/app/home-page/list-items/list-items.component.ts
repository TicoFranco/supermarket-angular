import { Component, EventEmitter, Output} from '@angular/core';
import { NgIf,NgStyle,NgFor } from '@angular/common';
import { ItemServiceService } from '../../../../service/item-service.service';
import { ItemInterface } from '../../../../service/ItemInterface';
import { ItemComponent } from './item/item.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-items',
  imports: [NgIf,NgStyle,ItemComponent,CommonModule,NgFor],
  templateUrl: './list-items.component.html',
  styleUrl: './list-items.component.css',
  standalone:true
})
export class ListItemsComponent{
  abaAtiva:string = 'carnes';
  item:ItemInterface | undefined = undefined;
  Carnes:ItemInterface[] = [];
  Massas:ItemInterface[] = [];
  Doces:ItemInterface[] = [];
  Bebidas:ItemInterface[] = [];
  @Output() message=new EventEmitter<ItemInterface>();
  service:ItemServiceService;
 
  constructor(s:ItemServiceService){
    this.service=s;
  }

  ngOnInit(): void {
    this.service.listAll().subscribe({
          next:(list) => {
            this.Carnes = list.filter(item => item.type == 'CARNE');
            this.Massas = list.filter(item => item.type == 'MASSA');
            this.Doces = list.filter(item => item.type == 'DOCE');
            this.Bebidas = list.filter(item => item.type == 'BEBIDA');
          }
          }
        )
  }

  ativarAba(aba: string) {
   this.abaAtiva = aba;
  }

  goToCart(){
    this.message.emit(this.item);
  }

  //item -> list-items -> home-page -> menu-bar
  getMessage(item:ItemInterface){
    this.item=item;
    this.goToCart();
  }

}

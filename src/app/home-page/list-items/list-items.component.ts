import { Component } from '@angular/core';
import {ItemComponent} from './item/item.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-list-items',
  imports: [ItemComponent,NgIf],
  templateUrl: './list-items.component.html',
  styleUrl: './list-items.component.css',
  standalone:true
})
export class ListItemsComponent {
    carnes:boolean=true
    massas:boolean=false
    bebidas:boolean=false
    doces:boolean=false

    ativarCarnes(){
      this.carnes=true
      this.massas=false
      this.bebidas=false
      this.doces=false
    }

    ativarMassas(){
      this.carnes=false
      this.massas=true
      this.bebidas=false
      this.doces=false
    }

    ativarBebidas(){
      this.carnes=false
      this.massas=false
      this.bebidas=true
      this.doces=false
    }

    ativarDoces(){
      this.carnes=false
      this.massas=false
      this.bebidas=false
      this.doces=true
    }
}

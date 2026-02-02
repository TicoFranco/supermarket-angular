import { Component,Input,Output,EventEmitter } from '@angular/core';
import { ItemInterface } from '../../../../../service/ItemInterface';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-item-vertical',
  imports: [NgIf],
  templateUrl: './item-vertical.component.html',
  styleUrl: './item-vertical.component.css',
  standalone:true
})
export class ItemVerticalComponent {

  @Output() message=new EventEmitter<ItemInterface>();
  @Input() item!: ItemInterface;

  constructor(){}

  //itemVertical -> list-items -> home-page -> menu-bar
  goToCart(){
    this.message.emit(this.item);
  }

}

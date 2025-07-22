import { Component,Input,OnInit,Output,EventEmitter } from '@angular/core';
import { list_items } from '../../../data/data_list';

@Component({
  selector: 'app-item-vertical',
  imports: [],
  templateUrl: './item-vertical.component.html',
  styleUrl: './item-vertical.component.css',
  standalone:true
})
export class ItemVerticalComponent {
  @Input() id:number | undefined = undefined;
  preco:string='';
  nome:string='';
  imagem:string='';
  @Output() message=new EventEmitter<number>();

  constructor(){}

  ngOnInit(): void{
    const result=list_items.filter(item => item.id==this.id)[0];
    this.preco=result.preco;
    this.nome=result.nome;
    this.imagem=result.imagem;
  }

  //itemVertical -> list-items -> home-page -> menu-bar
  goToCart(){
    this.message.emit(this.id);
  }

}

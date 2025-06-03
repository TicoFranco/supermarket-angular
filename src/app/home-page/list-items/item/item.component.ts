import { Component,Input,OnInit } from '@angular/core';
import { list_items } from '../../../data/data_list';

@Component({
  selector: 'app-item',
  imports: [],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css',
  standalone:true
})
export class ItemComponent {
  @Input() id:number=0;
  preco:string='';
  nome:string='';
  imagem:string='';

  constructor(){}

  ngOnInit(): void{
    const result=list_items.filter(item => item.id==this.id)[0];
    this.preco=result.preco;
    this.nome=result.nome;
    this.imagem=result.imagem;
  }

}

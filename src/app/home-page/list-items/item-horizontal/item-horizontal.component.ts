import { Component,OnInit,Input,Output, EventEmitter} from '@angular/core';
import { list_items } from '../../../data/data_list';

@Component({
  selector: 'app-item-horizontal',
  imports: [],
  templateUrl: './item-horizontal.component.html',
  styleUrl: './item-horizontal.component.css'
})
export class ItemHorizontalComponent {
  @Input() id:number=0;
  nome:string="";
  count:number=0;
  total_item:number=0;
  preco:number=0;
  imagem:string="";
  @Output() message=new EventEmitter<number>();
  @Output() destroy=new EventEmitter<void>();

  ngOnInit(): void{
      const result=list_items.filter(item => item.id==this.id)[0];
      this.nome=result.nome;
      this.imagem=result.imagem;
      this.preco=Number(result.preco);
      this.count=1;
      this.total_item=this.preco;
      this.message.emit(this.preco);
  }

  retirar_item(){
    if(this.count > 0){
      this.count--;
      this.total_item=this.preco*this.count;
      this.message.emit(this.preco*(-1));
    }
  }

  adicionar_item(){
    this.count++;
    this.total_item=this.preco*this.count;
    this.message.emit(this.preco);
  }

  deleteItem(){
    this.destroy.emit();
  }

}

import { Component, Input, ViewChild, ViewContainerRef,OnChanges,SimpleChanges,ChangeDetectorRef, ComponentRef, OnInit} from '@angular/core';
import { ItemHorizontalComponent } from '../list-items/item-horizontal/item-horizontal.component';
import { RouterLink,RouterOutlet} from '@angular/router';
import { ItemInterface } from '../../../../service/ItemInterface';
import { NgIf } from '@angular/common';
import { ItemServiceService } from '../../../../service/item-service.service';
import { ItemManipulationInterface } from '../../../../service/ItemManipulationInterface';


@Component({
  selector: 'app-menu-bar',
  imports: [ItemHorizontalComponent,RouterLink,RouterOutlet,NgIf],
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.css',
  standalone:true
})
export class MenuBarComponent implements OnInit,OnChanges{
  @ViewChild('items',{ read: ViewContainerRef,static:true }) items!: ViewContainerRef;

  buttonState:boolean=false;
  buttonVisual:string="disabled";

  total_compra:number=0;
  count:number=0;

  @Input() item:ItemInterface | undefined=undefined;
  itemsList:ItemInterface[] = [];
  componentsList:ComponentRef<ItemHorizontalComponent>[] = [];

  loading:boolean = true;
  confirmed:boolean = false;
  notConfirmed:boolean = false;

  service:ItemServiceService
  accountState:string = '/login';

  constructor(private refresh:ChangeDetectorRef,service:ItemServiceService){
    this.service = service;
  }

  ngOnInit(): void {
    this.service.getUserLogged().subscribe(userLogged =>{
      if(userLogged){
        this.accountState = '/user';
      }else{
        this.accountState = '/login';
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['item'] && this.item !== undefined && !this.itemsList.includes(this.item)){
      this.itemsList.push(this.item);
      this.itemConfig(this.item);
    }
    this.item = {
      id:100,
      price:0,
      name:'',
      type:'',
      url:''
    }
  }


  itemConfig(item:ItemInterface){

    //adicionando o item ao carrinho
    const ref=this.items.createComponent(ItemHorizontalComponent);
    ref.instance.item=item;
    ref.instance.message.subscribe(
      (message:ItemManipulationInterface) => this.getMessage({
        price:message.price,
        count:message.count
      })
    );
    this.componentsList.push(ref);

    //excluindo item do carrinho
    ref.instance.destroy.subscribe(() => {
      this.count = this.count-ref.instance.count;
      const indexDeleteComponentsList=this.componentsList.indexOf(ref);
      const indexDeleteItemsList = this.itemsList.indexOf(ref.instance.item);
      if(indexDeleteItemsList > -1 && indexDeleteComponentsList > -1){
        this.componentsList.splice(indexDeleteComponentsList,1);
        this.itemsList.splice(indexDeleteItemsList,1);
        this.getMessage({
          price:ref.instance.total_item*(-1),
          count:0
        });
        ref.destroy();
      }
    });
  }

  verifyState(){
    if(this.count>0){
      this.buttonState=true;
      this.buttonVisual="";
    }else{
      this.buttonState=false;
      this.buttonVisual="disabled";
    }
  }

  getMessage(message:ItemManipulationInterface){
    this.count = this.count+message.count;
    this.total_compra=this.total_compra+message.price;
    this.verifyState();
    this.refresh.detectChanges();
  }

  //funcao do menu-bar que convoca cada itemHorizontal a transmitir seu id e o seu total de itens
  //cada info de cada item sera armazenada em uma lista com formato de dto de id/quantidade junto com o total da compra
  //ai sera feito um metodo post para guardar na conta do user o registro da compra
  Buy(){
    const response = this.componentsList.map(ref => ref.instance.getInfoBuy());
    this.service.addOrder(response).subscribe(result =>{
      this.loading = false;
      if(result){
        this.confirmed = true;
      }else{
        this.notConfirmed = true;
      }
    })
  }
}

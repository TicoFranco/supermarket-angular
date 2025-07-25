import { Component, Input, ViewChild, ViewContainerRef,OnChanges,SimpleChanges,ChangeDetectorRef} from '@angular/core';
import { ItemHorizontalComponent } from '../list-items/item-horizontal/item-horizontal.component';
import { RouterLink,RouterOutlet} from '@angular/router';


@Component({
  selector: 'app-menu-bar',
  imports: [ItemHorizontalComponent,RouterLink,RouterOutlet],
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.css',
  standalone:true
})
export class MenuBarComponent {
  @ViewChild('items',{ read: ViewContainerRef,static:true }) items!: ViewContainerRef;

  buttonState:boolean=false;
  buttonVisual:string="disabled";
  total_compra:number=0;
  count:number=0;
  @Input() itemId:number | undefined=undefined;
  idList:number[]=[];

  constructor(private refresh:ChangeDetectorRef){}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['itemId'] && this.itemId !== undefined && !this.idList.includes(this.itemId)){
      this.idList.push(this.itemId);
      this.itemConfig(this.itemId);
    }
  }

  itemConfig(id:number){

    //adicionando o item ao carrinho
    const ref=this.items.createComponent(ItemHorizontalComponent);
    ref.instance.id=id;
    ref.instance.message.subscribe(
      (n:number) => this.getMessage(n)
    );
    ref.instance.id = Number(`${id}`);

    //excluir item do carrinho
    ref.instance.destroy.subscribe(() => {
      this.count=this.count-ref.instance.count+1;
      const indexDelete=this.idList.indexOf(ref.instance.id);
      this.idList[indexDelete]=-1;
      this.getMessage(ref.instance.total_item*(-1));
      ref.destroy();
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

  getMessage(message:number){
    if(message < 0){
      this.count--;
    }else if(message > 0){
      this.count++;
    }
    this.verifyState();
    this.total_compra=this.total_compra+message;
    this.refresh.detectChanges();
  }
}

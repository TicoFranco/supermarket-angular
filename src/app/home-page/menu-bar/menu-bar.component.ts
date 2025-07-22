import { Component, Input, ViewChild, ViewContainerRef,OnChanges,SimpleChanges} from '@angular/core';
import { ItemHorizontalComponent } from '../list-items/item-horizontal/item-horizontal.component';


@Component({
  selector: 'app-menu-bar',
  imports: [ItemHorizontalComponent],
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.css',
  standalone:true
})
export class MenuBarComponent {
  @ViewChild('items',{ read: ViewContainerRef,static:true }) items!: ViewContainerRef;

  button_state:string="";
  total_compra:number=0;
  @Input() itemId:number | undefined=undefined;
  idList:number[]=[];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['itemId'] && this.itemId !== undefined && !this.idList.includes(this.itemId)) {
      this.idList.push(this.itemId);
      this.addItem(this.itemId);
    }
  }

  addItem(id:number){
    const ref=this.items.createComponent(ItemHorizontalComponent);
    ref.instance.id=id;
    ref.instance.message.subscribe(
      (n:number) => this.getMessage(n)
    );
  }

  getMessage(message:number){
    this.total_compra=this.total_compra+message;
  }
}

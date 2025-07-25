import { Component } from '@angular/core';
import {MenuBarComponent} from './menu-bar/menu-bar.component'
import {WelcomeCardComponent} from './welcome-card/welcome-card.component';
import {ListItemsComponent} from './list-items/list-items.component';
import { FooterComponentComponent } from './footer-component/footer-component.component';

@Component({
  selector: 'app-home-page',
  imports: [MenuBarComponent,WelcomeCardComponent,ListItemsComponent,FooterComponentComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  standalone:true
})
export class HomePageComponent {
  itemId:number | undefined = undefined;

  //itemVertical -> list-items -> home-page -> menu-bar
  getMessage(n:number){
    this.itemId=n;
  }
}

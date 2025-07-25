import { Component } from '@angular/core';
import { RouterLink,RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [RouterLink,RouterOutlet],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
  standalone:true
})
export class LoginPageComponent {

}

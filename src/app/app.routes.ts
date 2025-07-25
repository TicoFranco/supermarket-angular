import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignUpComponent } from './login-page/sign-up/sign-up.component';

export const routes: Routes = [
    {
        path:"",
        component:HomePageComponent
    },{
        path:"login",
        component:LoginPageComponent
    },
    {
        path:"cadastro",
        component:SignUpComponent
    }
];

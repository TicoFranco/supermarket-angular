import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  imports: [NgFor],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
  standalone:true
})
export class SignUpComponent {

  states:string[] = [
  "None",
  "Acre",
  "Alagoas",
  "Amapá",
  "Amazonas",
  "Bahia",
  "Ceará",
  "Distrito Federal",
  "Espírito Santo",
  "Goiás",
  "Maranhão",
  "Mato Grosso",
  "Mato Grosso do Sul",
  "Minas Gerais",
  "Pará",
  "Paraíba",
  "Paraná",
  "Pernambuco",
  "Piauí",
  "Rio de Janeiro",
  "Rio Grande do Norte",
  "Rio Grande do Sul",
  "Rondônia",
  "Roraima",
  "Santa Catarina",
  "São Paulo",
  "Sergipe",
  "Tocantins"
  ];
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ItemInterface } from './ItemInterface';
import { API_PATH } from '../environment/environment';
import { purchaseInterface,purchaseItem } from './PurchaseInterface';
import { TokenPayload } from './TokenPayload';
import { jwtDecode } from "jwt-decode";
import { UserInterface } from './UserInterface';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemServiceService {
  private userSearch = new BehaviorSubject<UserInterface>({
    email:'',
    firstName:'',
    lastName:'',
    orders:[],
    userRole:''
  });
  currentUser = this.userSearch.asObservable();

  constructor(private http:HttpClient) {}

  listAll(){
    return this.http.get<ItemInterface[]>(`food`);
  }

  verifyToken(){
    let token: string | null = null;

    if (typeof window !== 'undefined' && window.sessionStorage) {
       token = sessionStorage.getItem('token');
    }

    return token;
  }

 login(email: string, password: string): Observable<boolean> {
    const user = {email,password};

    return this.http.post<{Token:string}>(`auth/login`, user).pipe(
      map((response) => {
        const token:string = response.Token;
        if (typeof window !== 'undefined' && window.sessionStorage && token) {
          sessionStorage.setItem('token', token); 
          return true;
        }
        return false;
      }),
      catchError(() => of(false))
    );
  }

  getUserLogged(): Observable<boolean> {
    const token = this.verifyToken();

    if (!token) {
      return of(false);
    }

    const tokenUser = jwtDecode<{sub:string}>(token).sub;

    return this.http.get<UserInterface>(`auth/users/${tokenUser}`,{
       headers: {
          "Authorization": `Bearer ${token}`
       }
    }).pipe(
      map((user) => {
        this.userSearch.next(user);
        return true;
      }),
      catchError(() => of(false))
    );
  }

  addOrder(orders:purchaseItem[]):Observable<boolean>{
    const token = this.verifyToken();

    if (!token) {
      return of(false);
    }

    const tokenUser = jwtDecode<{sub:string}>(token).sub;
    
    return this.http.post(`auth/order`,{
        email:tokenUser,
        items: orders.map(order =>{
          return{
            id:order.id,
            count:order.count
          };
        })
      },{
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }).pipe(
        map(() => true),catchError(() => of(false))
      )
  }

  getOrders(){
    const token = this.verifyToken();

    if(!token){
      return null;
    }

    const tokenUser = jwtDecode<{sub:string}>(token).sub;

    return this.http.get<purchaseInterface[]>(`auth/users/${tokenUser}/orders`,{
      headers:{
        "Authorization": `Bearer ${token}`
      }
    })
  }
}

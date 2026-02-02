import { OrderInterface } from "./OrderInterface";

export interface UserInterface{
    email: string,
    firstName: string,
    lastName: string,
    orders: OrderInterface[],
    userRole:string
}
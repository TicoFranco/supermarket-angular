export interface purchaseItem{
    id:number,
    count:number
}

interface ItemInterfaceOutput{
    name:string,
    quantity:number,
    value:number,
    url:string
}

export interface purchaseInterface{
    date:string,
    total:number,
    items:ItemInterfaceOutput[]
}
import { CartItem } from './../shared/models/CartItem';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../shared/models/Cart';
import { Food } from '../shared/models/Food';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart:Cart=this.getCartFromLocalStorage();
  private cartSubject:BehaviorSubject<Cart>=new BehaviorSubject(this.cart)
  constructor() { }
  addToCart(food:Food):void{
    let cartItem=this.cart.items.find(item=>item.food.id===food.id);
    if(cartItem)
    return;
    this.cart.items.push(new CartItem(food));
    this.setCartToLocalStorage();
  }
  removeFromCart(foodId:string):void{
    this.cart.items=this.cart.items.filter(item=>item.food.id!=foodId);
    this.setCartToLocalStorage();
  }
  changeQuantity(foodId:string, quantity:number){
    let CartItem=this.cart.items.find(item=>item.food.id===foodId);
    if(!CartItem) return;

    CartItem.quantity=quantity;
    CartItem.price=quantity*CartItem.food.price;
    this.setCartToLocalStorage();
  }
  clearCart(){
    this.cart=new Cart();
    this.setCartToLocalStorage();
  }
  getCartObservable():Observable<Cart>{
    return this.cartSubject.asObservable();
  }
  getCart():Cart{
    return this.cartSubject.value;
  }
  private setCartToLocalStorage():void{
    this.cart.totalPrice=this.cart.items
    .reduce((preSum,currentItem)=>preSum+currentItem.price,0);
    this.cart.totalCount=this.cart.items
    .reduce((preSum,currentItem)=>preSum+currentItem.quantity,0);

    const cartJson=JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson)
    this.cartSubject.next(this.cart);
  }
  private getCartFromLocalStorage():Cart{
    const cartJson=localStorage.getItem('Cart');
    return cartJson?JSON.parse(cartJson):new Cart();
  }
}

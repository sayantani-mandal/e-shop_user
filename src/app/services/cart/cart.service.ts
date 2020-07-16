import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = {};
  private _cartObservable: BehaviorSubject<Object>;
  constructor() {
    if (!this.isCartExist()) {
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }
    this.readCartData();
    this._cartObservable = new BehaviorSubject(this.cart);
  }

  readCartData() {
    this.cart = JSON.parse(localStorage.getItem('cart'));
  }

  writeCartData() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  get cartObservable() {
    return this._cartObservable;
  }

  addToCart(product: any) {
    const quantity = this.cart[product._id];
    if (quantity) {
      this.cart[product._id] = +quantity + 1;
    } else {
      this.cart[product._id] = 1;
    }
    this._cartObservable.next(this.cart);
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  isCartExist() {
    if (localStorage.getItem('cart')) {
      return true;
    } else {
      return false;
    }
  }

  getQuantity(product: any) {
    return this.cart[product._id] ? +this.cart[product._id] : 0;
  }

  setQuantity(product: any, quantity: number) {
    if (quantity < 1) {
      delete this.cart[product._id];
    } else {
      this.cart[product._id] = quantity;
    }

    this.writeCartData();
    this._cartObservable.next(this.cart);
  }

  removeFromCart(product: any) {}
}

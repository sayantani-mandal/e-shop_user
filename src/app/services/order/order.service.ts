import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  placeOrderUrl = 'http://localhost:3006/api/orders';

  constructor(private http: HttpClient, private userService: UserService) {}

  placeOrder(orderInfo: OrderInfo) {
    return this.http.post(this.placeOrderUrl, orderInfo, {
      headers: { token: this.userService.getToken() },
    });
  }
}

export interface OrderInfo {
  firstName: string;
  lastName: string;
  address: string;
  products: ProductInfo[];
}

export interface ProductInfo {
  productId: string;
  price: number;
  quantity: number;
}

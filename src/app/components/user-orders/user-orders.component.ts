import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css'],
})
export class UserOrdersComponent implements OnInit {
  orders: any;

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.collectOrders();
  }

  collectOrders() {
    this.orderService.getUserOrders().subscribe({
      next: (orders) => {
        // console.log(orders);
        this.orders = orders;
        console.log(this.orders);
      },
    });
  }
}

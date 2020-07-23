import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order/order.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css'],
})
export class UserOrdersComponent implements OnInit {
  orders: any;

  constructor(
    private orderService: OrderService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.collectOrders();
  }

  // collectOrders() {
  //   this.orderService.getUserOrders().subscribe({
  //     next: (orders) => {
  //       // console.log(orders);
  //       this.orders = orders;
  //       console.log(this.orders);
  //     },
  //   });
  // }
  collectOrders() {
    this.orderService.getUserOrders().subscribe({
      next: (orders) => {
        // console.log(orders);
        this.orders = orders;
        console.log(this.orders);
      },
      // error: (err) => {
      //   // console.log(err);
      //   // if (err) {
      //   //   localStorage.removeItem('token');
      //   //   localStorage.removeItem('otp');
      //   //   localStorage.removeItem('exp');
      //   //   this.router.navigate(['login']);
      //   // }
      // },
    });
  }
}

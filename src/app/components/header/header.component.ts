import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isSelected = false;
  numberOfItems = 0;
  isLoggedin = false;

  constructor(
    private userService: UserService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.cartService.cartObservable.subscribe((cart) => {
      console.log(cart);
      this.numberOfItems = Object.keys(cart).length;
    });

    this.userService.loginObservable.subscribe({
      next: () => {
        const token = this.userService.getToken();
        const otp = this.userService.getOtpFromLocalstorage();
        console.log(otp);
        if (token && otp != null) {
          this.isLoggedin = true;
        } else {
          this.isLoggedin = false;
        }
      },
    });
    // let token = this.userService.getToken();
    // if (token != null) {
    //   this.isLoggedin = true;
    // } else {
    //   this.isLoggedin = false;
    // }
  }

  onLogout() {
    this.isSelected = true;
    this.userService.logout();
  }
}

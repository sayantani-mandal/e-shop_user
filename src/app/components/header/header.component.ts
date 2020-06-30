import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user/user.service";
import { CartService } from "src/app/services/cart/cart.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  isSelected: boolean = false;
  numberOfItems: number = 0;

  constructor(
    private userService: UserService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.cartService.cartObservable.subscribe((cart) => {
      console.log(cart);
      this.numberOfItems = Object.keys(cart).length;
    });
  }

  onLogout() {
    this.isSelected = true;
    this.userService.logout();
  }
}

import { Component, OnInit } from "@angular/core";
import { CartService } from "src/app/services/cart/cart.service";
import { ProductService } from "src/app/services/product/product.service";
import { forkJoin } from "rxjs";
import { map } from "rxjs/operators";

interface CartItem {
  product: any;
  quantity: number;
}

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
})
export class CartComponent implements OnInit {
  cart;
  cartItems: CartItem[];

  constructor(
    private cartService: CartService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.subscribeCart();
  }

  subscribeCart() {
    this.cartService.cartObservable.subscribe((cart) => {
      this.cartItems = [];
      let observables = [];
      for (let id in cart) {
        console.log(id);
        observables.push(
          this.productService.getProductById(id).pipe(
            map((product) => {
              let item: CartItem = {
                product: product,
                quantity: cart[id],
              };
              return item;
            })
          )
        );

        // .subscribe((product) => {
        //   let item: CartItem = {
        //     product: product,
        //     quantity: cart[id],
        //   };
        //   this.cartItems.push(item);
        //   console.log(this.cartItems);
        // });
      }
      forkJoin(observables).subscribe((cartItems: CartItem[]) => {
        console.log(cartItems);
        this.cartItems = cartItems;
      });
    });
  }
}

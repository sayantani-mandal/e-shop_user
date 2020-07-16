import { Component, OnInit, Input } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Input()
  product: any;

  quantity = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    console.log(this.product);
    this.cartService.cartObservable.subscribe((cart) => {
      this.quantity = this.cartService.getQuantity(this.product);
    });
  }

  addToCart() {
    console.log(this.product);
    this.cartService.addToCart(this.product);
  }

  // minusQuantity() {
  //   this.quantity--;
  //   this.cartService.setQuantity(this.product, this.quantity);
  // }

  // plusQuantity() {
  //   this.quantity++;
  //   this.cartService.setQuantity(this.product, this.quantity);
  // }
}

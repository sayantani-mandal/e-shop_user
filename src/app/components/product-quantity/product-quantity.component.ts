import { Component, OnInit, Input } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css'],
})
export class ProductQuantityComponent implements OnInit {
  @Input()
  product: any;
  quantity = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cartObservable.subscribe((cart) => {
      this.quantity = this.cartService.getQuantity(this.product);
    });
  }

  minusQuantity() {
    this.quantity--;
    this.cartService.setQuantity(this.product, this.quantity);
  }

  plusQuantity() {
    this.quantity++;
    this.cartService.setQuantity(this.product, this.quantity);
  }
}

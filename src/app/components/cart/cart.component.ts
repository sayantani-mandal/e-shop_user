import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';
import { ProductService } from 'src/app/services/product/product.service';
import { forkJoin, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  OrderInfo,
  ProductInfo,
  OrderService,
} from 'src/app/services/order/order.service';
import { Router } from '@angular/router';

interface CartItem {
  product: any;
  quantity: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  forms: FormGroup;
  firstName: string;
  lastName: string;
  address: string;
  cart;
  total = 0;
  cartItems: CartItem[] = [];
  cartSubscription: Subscription;
  modalRef: BsModalRef;

  constructor(
    private cartService: CartService,
    private modalService: BsModalService,
    private productService: ProductService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit() {
    this.subscribeCart();
    this.forms = new FormGroup({
      firstName: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('[A-Za-z]{3,}'),
        ],
      }),
      lastName: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('[A-Za-z]{3,}'),
        ],
      }),
      address: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(5)],
      }),
    });

    // this.subscribeCart();
  }

  get fName() {
    return this.forms.get('firstName');
  }

  get lName() {
    return this.forms.get('lastName');
  }

  get Address() {
    return this.forms.get('address');
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
  }

  subscribeCart() {
    let total = 0;
    this.cartSubscription = this.cartService.cartObservable.subscribe(
      (cart) => {
        const observables = [];
        total = 0;
        if (Object.keys(cart).length === 0) {
          this.cartItems = [];
        }
        for (const id in cart) {
          if (cart.hasOwnProperty(id)) {
            // linting_error
            console.log(id);
            observables.push(
              this.productService.getProductById(id).pipe(
                map((product) => {
                  // console.log();
                  // this.total += product.price * cart[id];
                  console.log(product.hasOwnProperty('price'));
                  console.log(product);

                  const item: CartItem = {
                    product,
                    quantity: cart[id],
                  };
                  total += item.product.price * cart[id];
                  return item;
                })
              )
            );
          } // add_for_linting-error
        }
        forkJoin(observables).subscribe((cartItems: CartItem[]) => {
          console.log(cartItems);
          this.total = total;
          this.cartItems = cartItems;
        });
      }
    );
  }

  // openModal
  openModal(form) {
    this.modalRef = this.modalService.show(form, {
      animated: true,
      class: 'modal-lg',
    });
  }
  // checkOut
  checkOut() {
    if (this.forms.invalid) {
      console.log(this.forms);
      return;
    }

    let orderInfo: OrderInfo;
    let productInfos: ProductInfo[] = [];
    this.cartItems.forEach((e) => {
      console.log(e);

      productInfos.push({
        price: e.product.price,
        productId: e.product._id,
        quantity: e.quantity,
      });
    });

    orderInfo = {
      firstName: this.forms.value.firstName,
      lastName: this.forms.value.lastName,
      address: this.forms.value.address,
      products: productInfos,
    };

    console.log({ orderInfo });

    this.orderService.placeOrder(orderInfo).subscribe({
      next: (result) => {
        console.log(result);
        this.modalRef.hide();
        this.cartService.clearCart();
        this.router.navigate(['orders']);
      },
      error: (err) => {
        console.log({ err: 'Can not place order..' });
      },
    });

    // console.log({
    //   firstName: this.forms.value.firstName,
    //   lastName: this.forms.value.lastName,
    //   address: this.forms.value.address,
    // });
  }
}

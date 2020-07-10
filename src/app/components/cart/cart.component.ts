import { Component, OnInit } from "@angular/core";
import { CartService } from "src/app/services/cart/cart.service";
import { ProductService } from "src/app/services/product/product.service";
import { forkJoin, Subscription } from "rxjs";
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
  total = 0;
  cartItems: CartItem[] = [];
  cartSubscription: Subscription;

  constructor(
    private cartService: CartService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.subscribeCart();
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
  }

  subscribeCart() {
    let total = 0
    this.cartSubscription = this.cartService.cartObservable.subscribe(
      (cart) => {
        let observables = [];
        total = 0;
        if (Object.keys(cart).length == 0) {
          this.cartItems = [];
        }
        for (let id in cart) {
          console.log(id);
          observables.push(
            this.productService.getProductById(id).pipe(
              map((product) => {
                //console.log();
                //this.total += product.price * cart[id];
               console.log(product.hasOwnProperty("price"));
                console.log(product);

                let item: CartItem = {
                  product: product,
                  quantity: cart[id],
                };
                total += item.product.price * cart[id];
                return item;
              })
            )
          );
        }
        forkJoin(observables).subscribe((cartItems: CartItem[]) => {
          console.log(cartItems);
          this.total = total;
          this.cartItems = cartItems;
        });
      }
    );
  }


}






// import { Component, OnInit } from "@angular/core";
// import { CartService } from "src/app/services/cart/cart.service";
// import { ProductService } from "src/app/services/product/product.service";
// import { forkJoin, Subscription } from "rxjs";
// import { map } from "rxjs/operators";

// interface CartItem {
//   product: any;
//   quantity: number;
// }

// @Component({
//   selector: "app-cart",
//   templateUrl: "./cart.component.html",
//   styleUrls: ["./cart.component.css"],
// })
// export class CartComponent implements OnInit {
//   cart;
//   total = 0;
//   cartItems: CartItem[] = [];
//   cartSubscription: Subscription;

//   constructor(
//     private cartService: CartService,
//     private productService: ProductService
//   ) {}

//   ngOnInit() {
//     this.subscribeCart()
//   }

//   // ngOnDestroy() {
//   //   this.cartSubscription.unsubscribe();
//   // }

//   subscribeCart() {
//     this.cartService.cartObservable.subscribe({
//       next : (cart) => {
//        let observables =[]
//         for(let id in cart){
//           console.log(id);
//           observables.push( this.productService.getProductById(id)
//           .pipe(map(product => {
//               let item : CartItem = {
//                 product : product,
//                 quantity : cart[id]
//               }
//               return item
//           }))
//           )
         
//          //  .subscribe({
//          //    next:(product) => {
             
//          //      let item : CartItem = {
//          //        product : product,
//          //        quantity : cart[id]
//          //      }
//          //      this.cartItems.push(item);
//          //      console.log(this.cartItems);
//          //    }
//          //  })
          
//         }
//        forkJoin(observables).subscribe({
//          next: (cartItems : CartItem[]) =>{
//            this.cartItems = cartItems
//            console.log(cartItems);
           
           
//          }
//        })
//       }
//     })
   
//   }


//}


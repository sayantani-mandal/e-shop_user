import { Component, OnInit } from "@angular/core";
import { ProductService } from "src/app/services/product/product.service";

@Component({
  selector: "app-store",
  templateUrl: "./store.component.html",
  styleUrls: ["./store.component.css"],
})
export class StoreComponent implements OnInit {
  products: any;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getPro().subscribe((res) => {
      this.products = res;
      console.log(this.products);
    });
  }
}

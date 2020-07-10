import { Component, OnInit } from "@angular/core";
import { ProductService } from "src/app/services/product/product.service";
import { ActivatedRoute, ParamMap } from "@angular/router";

@Component({
  selector: "app-store",
  templateUrl: "./store.component.html",
  styleUrls: ["./store.component.css"],
})
export class StoreComponent implements OnInit {
  products: any;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {

    this.route.queryParamMap.subscribe({
      next: (paramMap: ParamMap) => {
        let categoryId = paramMap.get("category");
        console.log(categoryId);
        this.collectProducts({category : categoryId});
      },
    });
   

  }

  // collectProducts() {
  //   this.productService.getPro().subscribe((res) => {
  //     this.products = res;
  //     console.log(this.products);
  //   });
  // }

  collectProducts(params){
    this.productService.getProductByCategory(params).subscribe({
      next : (products) =>{
        console.log(products);
        this.products = products
      },
      error:(error) =>{
        console.log(error);
        
      }
    })
  }
  
}

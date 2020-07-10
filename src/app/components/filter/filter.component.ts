import { Component, OnInit } from "@angular/core";
import { CategoryService } from "src/app/services/category/category.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-filter",
  templateUrl: "./filter.component.html",
  styleUrls: ["./filter.component.css"],
})
export class FilterComponent implements OnInit {
  categories: any;
  min : number[] = []

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit() {
    Array(10).fill('').forEach((e,index) => {
      console.log((index+1)*100);
      
    })
    
    this.collectAllCategory();
  }

  categorySelected(category_id: string) {
    console.log(category_id);
    this.router.navigate([""], {
      queryParams: {
        category: category_id,
      },
    });
  }

  collectAllCategory() {
    this.categoryService.getCategories().subscribe((res) => {
      this.categories = res;
      console.log(this.categories);
    });
  }
}

import { Component, OnInit } from "@angular/core";
import { CategoryService } from "src/app/services/category/category.service";

@Component({
  selector: "app-filter",
  templateUrl: "./filter.component.html",
  styleUrls: ["./filter.component.css"],
})
export class FilterComponent implements OnInit {
  categories: any;

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.categoryService.getCategories().subscribe((res) => {
      this.categories = res;
      console.log(this.categories);
    });
  }

  categorySelected(category_id: string) {
    console.log(category_id);
  }
}

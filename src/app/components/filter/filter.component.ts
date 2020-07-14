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
  min : number[] =[]
  max : any[] =[]
  category=''

  constructor(
    private categoryService: CategoryService,
    private router: Router,
   
  ) {}

  ngOnInit() {
    Array(20).fill("").forEach((e,index) => {
      this.min.push((index+1)*1000);
      
    })
    
    this.collectAllCategory();
  }

  setMaxValue(minPrice : number){
    //console.log(minPrice);
    this.max=[]
    Array(10).fill('').forEach((e,index) => {
      this.max.push(+minPrice + ((index+1)*1000))
      console.log(this.max);  
    })
    //console.log(this.max[this.max.length-1]);
    this.max.push(this.max[this.max.length-1] + "+")
    
    
  }

  categorySelected(category_id: string) {
    console.log(category_id);
    this.category =category_id;
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



  filter(minValue , maxValue){
    let queryParams = {
      "category": this.category,
    }
    if(!isNaN(minValue)){
      queryParams['min']=minValue
      //console.log({minValue});
    }
    if(!isNaN(maxValue)){
      queryParams['max']=maxValue
      //console.log({maxValue});
    }

    this.router.navigate([""], {
     queryParams
    });
    
  }

  onReset(){
  this.router.navigate([""]);

  // setTimeout(()=>{
  //   window.location.reload();
  // }, 100);
 
  }
}

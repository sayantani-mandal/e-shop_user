import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserService } from "../user/user.service";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: "root",
})
export class ProductService {

 // getProductUrl = "http://localhost:3006/api/products/user";
  url="http://localhost:3006/api/products/user/getAllProducts"
  constructor(private http: HttpClient, private userService: UserService) {}

  // getPro() {
  //   return this.http.get(this.getProductUrl, {
  //     headers: { token: this.userService.getToken() },
  //   });
  // }

   getProductByCategory(params) {

    let query = new URLSearchParams()
    if(params["category"]){
      query.append("category" , params["category"])

    }
    if(params["min"]){
      query.append("min" , params["min"])

    }
    if(params["max"]){
      query.append("max" , params["max"])

    }
    
   console.log(query.toString());

    return this.http.get(`${this.url}?${query.toString()}`).pipe(
      map((result : { count : number , products : any}) => {
        return result.products
      })
    )
  }

  // getProductById(id: string) {
  //   return this.http.get(`${this.getProductUrl}/${id}`);
  // }

  getProductById(id: string) {
    return this.http.get(`${this.url}/${id}`).pipe(
      map((result) => {      
        console.log(result);   
        return <{product:any}>result
      })
    );
  }
}

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserService } from "../user/user.service";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  //token : string = this.userService.getToken()
  getProductUrl = "http://localhost:3006/api/products/user";
  constructor(private http: HttpClient, private userService: UserService) {}

  getPro() {
    return this.http.get(this.getProductUrl, {
      headers: { token: this.userService.getToken() },
    });
  }

  getProductById(id: string) {
    return this.http.get(`${this.getProductUrl}/${id}`);
  }
}

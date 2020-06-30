import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  getProductUrl = "http://localhost:3006/api/products/user";
  constructor(private http: HttpClient) {}

  getPro() {
    return this.http.get(this.getProductUrl);
  }

  getProductById(id: string) {
    return this.http.get(`${this.getProductUrl}/${id}`);
  }
}

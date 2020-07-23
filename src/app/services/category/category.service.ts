import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient, private userService: UserService) {}

  getCategories() {
    return this.http.get('http://localhost:3006/api/categories/user', {
      headers: { token: this.userService.getToken() },
    });
  }
}

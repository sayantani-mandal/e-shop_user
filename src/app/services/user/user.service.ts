import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class UserService {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  password: string;
  constructor(private http: HttpClient) {}

  signup(
    firstName: string,
    lastName: string,
    email: string,
    mobileNumber: string,
    password: string
  ) {
    const postData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      mobileNumber: mobileNumber,
      password: password,
    };
    this.http
      .post("http://localhost:3006/api/users", postData)
      .subscribe((res) => {
        console.log(res);
      });
  }
}

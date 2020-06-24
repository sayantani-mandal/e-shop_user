import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { Router, ActivatedRoute } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private token: string;
  private otp: string;
  error: string = null;
  private userSignupUrl = "http://localhost:3006/api/users";
  private authStatusListener = new Subject<string>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

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
    this.http.post(this.userSignupUrl, postData).subscribe(
      (res) => {
        console.log(res);
        alert("you are registered successfully");
        this.router.navigate(["login"]);
      },
      (error) => {
        console.log(error);
        this.error = error.error.Error;
        this.authStatusListener.next(this.error);
      }
    );
  }

  login(email: string) {
    const authData: any = {
      email: email,
    };
    this.http
      .post<{ token: string; otp: string }>(
        "http://localhost:3006/api/login",
        authData
      )
      .subscribe((response) => {
        console.log(response);
        sessionStorage.setItem("otp", response.otp);
        localStorage.setItem("token", response.token);
        this.token = response.token;
        this.otp = response.otp;
        const otp = this.otp;
        const token = this.token;
        if (token && otp) {
          alert("OTP is delivered to your registered Email");
          this.router.navigate(["login/login-verify"]);
        }
      });
  }
  getToken() {
    this.token = localStorage.getItem("token");
    return this.token;
  }
  getOtp() {
    this.otp = sessionStorage.getItem("otp");
    return this.otp;
  }

  verify() {
    console.log(this.otp);
    console.log(this.token);
    this.http
      .get("http://localhost:3006/api/login/show", {
        headers: { token: this.token, otp: this.otp },
      })
      .subscribe((response) => {
        console.log(response);
        alert("you are successfully Logged in");
        this.router.navigate(["home"]);
      });
  }

  getAuthListener() {
    return this.authStatusListener.asObservable();
  }
}

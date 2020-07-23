import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, BehaviorSubject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private token: string;
  private otp: string;
  private new_otp: string;
  error: string = null;
  private userSignupUrl = 'http://localhost:3006/api/users';
  private authStatusListener = new Subject<string>();
  private _loginObservable: BehaviorSubject<Object>;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this._loginObservable = new BehaviorSubject({});
  }

  public get loginObservable() {
    return this._loginObservable;
  }

  signup(
    firstName: string,
    lastName: string,
    email: string,
    mobileNumber: string,
    password: string
  ) {
    const postData = {
      firstName,
      lastName,
      email,
      mobileNumber,
      password,
    };
    this.http.post(this.userSignupUrl, postData).subscribe(
      (res) => {
        console.log(res);
        alert('you are registered successfully');
        this.router.navigate(['login']);
      },
      (error) => {
        console.log(error);
        this.error = error.error.Error;
        this.authStatusListener.next(this.error);
      }
    );
  }

  // login(email: string) {
  //   const authData: any = {
  //     email,
  //   };
  //   this.http
  //     .post<{ token: string; otp: string }>(
  //       'http://localhost:3006/api/login',
  //       authData
  //     )
  //     .subscribe(
  //       (response) => {
  //         console.log(response);
  //         sessionStorage.setItem('otp', response.otp);
  //         localStorage.setItem('token', response.token);
  //         this._loginObservable.next({});
  //         console.log(response.token);
  //         this.token = response.token;
  //         this.otp = response.otp;
  //         const otp = this.otp;
  //         const token = this.token;
  //         if (token && otp) {
  //           alert('OTP is delivered to your registered Email');
  //           this.router.navigate(['login/login-verify']);
  //         }
  //       },
  //       (error) => {
  //         console.log(error);
  //         this.error = error.error.Error;
  //         this.authStatusListener.next(this.error);
  //       }
  //     );
  // }

  login(email: string) {
    const authData: any = {
      email,
    };
    this.http
      .post<{ token: string; otp: string; exp: string }>(
        'http://localhost:3006/api/login',
        authData
      )
      .subscribe(
        (response) => {
          console.log(response);
          sessionStorage.setItem('otp', response.otp);
          localStorage.setItem('token', response.token);
          // localStorage.setItem('exp', response.exp);
          this._loginObservable.next({});
          // console.log(response.token);
          this.token = response.token;
          this.otp = response.otp;
          const otp = this.otp;
          const token = this.token;
          if (token && otp) {
            alert('OTP is delivered to your registered Email');
            this.router.navigate(['login/login-verify']);
          }
          console.log(localStorage.getItem('token'));
        },
        (error) => {
          console.log(error);
          this.error = error.error.Error;
          this.authStatusListener.next(this.error);
        }
      );
  }
  getToken() {
    this.token = localStorage.getItem('token');
    return this.token;
  }
  getOtp() {
    this.otp = sessionStorage.getItem('otp');
    return this.otp;
  }
  getOtpFromLocalstorage() {
    this.new_otp = localStorage.getItem('otp');
    return this.new_otp;
  }

  // verify() {
  //   console.log(this.otp);
  //   console.log(this.token);
  //   this.http
  //     .get("http://localhost:3006/api/login/show", {
  //       headers: { token: this.token, otp: this.otp },
  //     })
  //     .subscribe((response) => {
  //       console.log(response);
  //       alert("You are successfully logged in");
  //       this.router.navigate(["home"]);
  //     });
  // }

  verify() {
    console.log(this.otp);
    console.log(this.token);
    this.http
      .get<{ otp: string }>('http://localhost:3006/api/login/show', {
        headers: { token: this.token, otp: this.otp },
      })
      .subscribe((response) => {
        console.log(response);
        localStorage.setItem('otp', response.otp);
        this._loginObservable.next({});
        alert('You are successfully logged in');
        this.router.navigate(['']);
      });
  }

  logout() {
    this.http
      .get('http://localhost:3006/api/login/logout', {
        headers: { token: this.token },
      })
      .subscribe((response) => {
        console.log(response);
        localStorage.removeItem('token');
        localStorage.removeItem('otp');
        // localStorage.removeItem('exp');
        this._loginObservable.next({});
        alert('You are logged out successfully ');
        this.router.navigate(['login']);
      });
  }

  getAuthListener() {
    return this.authStatusListener.asObservable();
  }

  // checkLoginStatus(): boolean {
  //   const token = this.getToken();

  //   if (token != null) {
  //     const decoded = jwt_decode(token);
  //     console.log(decoded);
  //     if (decoded.exp === undefined) {
  //       return false;
  //     }
  //     const date = new Date(0);
  //     const tokenExpDate = date.setUTCSeconds(decoded.exp);
  //     if (tokenExpDate.valueOf() > new Date().valueOf()) {
  //       return true;
  //     }
  //     localStorage.removeItem('token');
  //     localStorage.removeItem('otp');
  //     this._loginObservable.next({});
  //     console.log('New Date' + new Date().valueOf());
  //     console.log('Token Date' + tokenExpDate.valueOf());
  //     // this.router.navigate(['login']);
  //     return false;
  //   }

  //   return false;
  // }

  checkLoginStatus(): boolean {
    const token = this.getToken();

    if (token != null) {
      this.http
        .get('http://localhost:3006/api/login/tokenExpire', {
          headers: { token: this.token },
        })
        .subscribe({
          next: (res) => {
            console.log(res);
            return true;
          },
          error: (err) => {
            console.log(err);
            if (err) {
              console.log(err);
              localStorage.removeItem('token');
              localStorage.removeItem('otp');
              this.router.navigate(['login']);
              this._loginObservable.next({});
              return false;
            }
          },
        });
      return true;
    }

    return false;
  }

  // checkLoginStatus(): boolean {
  //   const token = this.getToken();

  //   if (token != null) {
  //     const date = new Date(0);
  //     const exp = localStorage.getItem('exp');
  //     const tokenExpDate = +exp;
  //     console.log(tokenExpDate);

  //     if (tokenExpDate.valueOf() > new Date().valueOf()) {
  //       return true;
  //     }

  //     localStorage.removeItem('token');
  //     localStorage.removeItem('otp');
  //     localStorage.removeItem('exp');
  //     this._loginObservable.next({});
  //     // console.log('New Date' + new Date().valueOf());
  //     // console.log('Token Date' + tokenExpDate.valueOf());
  //     return false;
  //   }

  //   return false;
  // }
}

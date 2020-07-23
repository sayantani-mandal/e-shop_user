// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuardService {

//   constructor() { }
// }

// canActivate(): boolean {
//   const token = this.userService.getToken();
//   if (token == null) {
//     this.router.navigate(['login']);
//     return false;
//   }
//   return true;
// }

import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from '../services/user/user.service';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(public router: Router, private userService: UserService) {}

  canActivate(): boolean {
    let flag = false;
    if (this.userService.checkLoginStatus()) {
      flag = true;
    } else {
      this.router.navigate(['login']);
    }
    return flag;
  }

  // checkLoginStatus() {
  //   const token = this.userService.getToken();
  //   const decoded = jwt_decode(token);
  //   console.log(decoded);
  //   if (token != null) {
  //     return true;
  //   }
  //   return false;
  // }
}

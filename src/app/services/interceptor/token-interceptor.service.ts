// import { Injectable, Injector } from '@angular/core';
// import { HttpInterceptor } from '@angular/common/http';
// import { UserService } from '../user/user.service';

// @Injectable()
// export class TokenInterceptorService implements HttpInterceptor {
//   constructor(private injector: Injector) {}
//   intercept(req, next) {
//     const userService = this.injector.get(UserService);
//     const tokenizedReq = req.clone({
//       setHeaders: {
//         token: userService.getToken(),
//       },
//     });
//     return next.handle(tokenizedReq);
//   }
// }

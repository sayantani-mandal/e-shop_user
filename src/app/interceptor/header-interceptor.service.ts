import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { UserService } from '../services/user/user.service';

@Injectable({
  providedIn: 'root',
})
export class HeaderInterceptorService implements HttpInterceptor {
  constructor(private userService: UserService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (this.userService.getToken()) {
      const header = req.headers.set('token', this.userService.getToken());

      const r = req.clone({
        headers: header,
      });
      console.log(r);
      return next.handle(r);
    } else {
      return next.handle(req);
    }
  }
}

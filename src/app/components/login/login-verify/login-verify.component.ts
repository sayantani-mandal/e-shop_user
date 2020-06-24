import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user/user.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login-verify",
  templateUrl: "./login-verify.component.html",
  styleUrls: ["./login-verify.component.css"],
})
export class LoginVerifyComponent implements OnInit {
  isVerify: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {}

  onVerify() {
    this.isVerify = true;
    this.userService.verify();
  }
}

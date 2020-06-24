import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UserService } from "src/app/services/user/user.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, { validators: [Validators.required] }),
    });
  }
  onLogin() {
    this.userService.login(this.form.value.email);
  }
}

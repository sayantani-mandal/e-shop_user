import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UserService } from "src/app/services/user/user.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  error: string = null;
  authStatus: Subscription;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email],
      }),
    });
  }
  onLogin() {
    this.userService.login(this.form.value.email);
    this.authStatus = this.userService.getAuthListener().subscribe((error) => {
      this.error = error;
    });
  }

  get emailAddress() {
    return this.form.get("email");
  }
}

import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UserService } from "src/app/services/user/user.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  password: string;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.form = new FormGroup({
      firstName: new FormControl(null, { validators: [Validators.required] }),
      lastName: new FormControl(null, { validators: [Validators.required] }),
      email: new FormControl(null, { validators: [Validators.required] }),
      mobileNumber: new FormControl(null, {
        validators: [Validators.required],
      }),
      password: new FormControl(null, { validators: [Validators.required] }),
    });
  }

  onSignup() {
    if (this.form.invalid) {
      console.log(this.form);
      return;
    }
    console.log(
      this.form.value.firstName,
      this.form.value.lastName,
      this.form.value.email,
      this.form.value.mobileNumber,
      this.form.value.password
    );
    this.userService.signup(
      this.form.value.firstName,
      this.form.value.lastName,
      this.form.value.email,
      this.form.value.mobileNumber,
      this.form.value.password
    );
    // this.userService.signup(
    //   this.firstName,
    //   this.lastName,
    //   this.email,
    //   this.mobileNumber,
    //   this.password
    // );
  }
}

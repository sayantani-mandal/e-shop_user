import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UserService } from "src/app/services/user/user.service";
import { Subscription } from "rxjs";

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
  error: string = null;
  authStatus: Subscription;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.form = new FormGroup({
      firstName: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern("[A-Za-z]{4}"),
        ],
      }),
      lastName: new FormControl(null, {
        validators: [Validators.required, Validators.pattern("[A-Za-z]{3}")],
      }),
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email],
      }),
      mobileNumber: new FormControl(null, {
        validators: [Validators.required, Validators.pattern("[6-9]\\d{9}")],
      }),
      password: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}$"
          ),
        ],
      }),
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
    this.authStatus = this.userService.getAuthListener().subscribe((error) => {
      this.error = error;
    });
  }

  get first() {
    return this.form.get("firstName");
  }
  get Lastname() {
    return this.form.get("lastName");
  }
  get emailAddress() {
    return this.form.get("email");
  }
  get Password() {
    return this.form.get("password");
  }
  get phone() {
    return this.form.get("mobileNumber");
  }
}

// ^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$
//^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$
//^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$
//^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$

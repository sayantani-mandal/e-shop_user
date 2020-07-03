import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { UserOrdersComponent } from "./components/user-orders/user-orders.component";
import { CartComponent } from "./components/cart/cart.component";
import { LoginComponent } from "./components/login/login.component";
import { SignupComponent } from "./components/signup/signup.component";
import { LoginVerifyComponent } from "./components/login/login-verify/login-verify.component";
import { HeaderComponent } from "./components/header/header.component";

const routes: Routes = [
  // { path: "", redirectTo: "/home", pathMatch: "full" },
  // { path: "home", component: HomeComponent },
  // { path: "orders", component: UserOrdersComponent },
  // { path: "cart", component: CartComponent },
  // { path: "login", component: LoginComponent },
  // { path: "login/login-verify", component: LoginVerifyComponent },
  // { path: "signup", component: SignupComponent },
  { path: "", component: HomeComponent },
  { path: "home", component: HomeComponent },
  { path: "orders", component: UserOrdersComponent },
  { path: "cart", component: CartComponent },
  { path: "login", component: LoginComponent },
  { path: "login/login-verify", component: LoginVerifyComponent },
  { path: "signup", component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { HomeComponent } from "./components/home/home.component";
import { StoreComponent } from "./components/store/store.component";
import { FilterComponent } from "./components/filter/filter.component";
import { ProductCardComponent } from "./components/product-card/product-card.component";
import { UserOrdersComponent } from "./components/user-orders/user-orders.component";
import { CartComponent } from "./components/cart/cart.component";
import { LoginComponent } from "./components/login/login.component";
import { SignupComponent } from "./components/signup/signup.component";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { LoginVerifyComponent } from './components/login/login-verify/login-verify.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    StoreComponent,
    FilterComponent,
    ProductCardComponent,
    UserOrdersComponent,
    CartComponent,
    LoginComponent,
    SignupComponent,
    LoginVerifyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

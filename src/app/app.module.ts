import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// ROUTING MODULE
import { AppRoutingModule } from './app-routing.module';

// MATERIAL MODULE
import { AppMaterialModule } from './app-material/app-material.module';

// ALL COMPONENTS
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { ProductsComponent } from './products/products.component';

// TEMPLATES
import { TopbarComponent } from './topbar/topbar.component';
import { ProductCardComponent } from './shared/template/product-card/product-card.component';

// ALL SERVICES
import { AccountService } from './services/account/account.service';
import { ProductService } from './services/product/product.service';
import { CartService } from './services/cart/cart.service';
import { ProfileService } from './services/profile/profile.service';

// DIALOGS
import { SignoutDialogComponent } from './shared/dialogs/signout-dialog/signout-dialog.component';
import { CheckoutComponent } from './shared/dialogs/checkout/checkout.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    ProductsComponent,
    TopbarComponent,
    ProductCardComponent,
    SignoutDialogComponent,
    CheckoutComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
  ],
  providers: [
    AccountService,
    ProductService,
    CartService,
    ProfileService
  ],
  entryComponents: [
    SignoutDialogComponent,
    CheckoutComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

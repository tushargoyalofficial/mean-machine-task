import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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

// ALL SERVICES
import { AccountService } from './services/account/account.service';
import { ProductService } from './services/product/product.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    ProductsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule
  ],
  providers: [
    AccountService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

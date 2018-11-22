import { Component, OnInit, OnDestroy, Inject, ViewChild, HostListener, AfterViewInit } from '@angular/core';
import { MatDialog, MatSnackBar, MatSidenav } from '@angular/material';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { CartService } from '../services/cart/cart.service';
import { Product } from '../shared/modalsl/product.modal';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit, OnDestroy {

  // FOR UNSUBSCRIBING FROM SUBSCRIPTION
  private ngUnsubscribe: Subject<boolean> = new Subject<boolean>();

  // CART PRODUCTS OBSERVABLE FOR REALTIME UPDATE
  public cartItems$: Observable<Product[]>; // SUBSCRIBE TO PRODUCT CART ITEMS
  public getTotalAmount$: Observable<number>; // SUBSCRIBE TO PRODUCT CART TOTAL AMOUNT

  constructor(
    private router: Router,
    private cartService: CartService
  ) { }





  cartPanel() {

  }





  signout() {

  }





  ngOnInit() {
    this.cartItems$ = this.cartService.getCartItems();
    this.getTotalAmount$ = this.cartService.getCartTotalAmount();
    this.cartItems$.subscribe(_ => _);
  }





  ngOnDestroy() {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
    this.ngUnsubscribe.unsubscribe();
  }

}

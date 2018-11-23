import { Component, OnInit, OnDestroy, Inject, ViewChild, HostListener, AfterViewInit } from '@angular/core';
import { MatDialog, MatSnackBar, MatSidenav } from '@angular/material';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { CartService } from '../services/cart/cart.service';
import { Product } from '../shared/modalsl/product.modal';
import { SignoutDialogComponent } from '../shared/dialogs/signout-dialog/signout-dialog.component';
import { CartProduct } from '../shared/modalsl/cart-product.modal';
import { AccountService } from '../services/account/account.service';
import { takeUntil } from 'rxjs/operators';
import { SERVERURL } from '../services/config/api';
import { CheckoutComponent } from '../shared/dialogs/checkout/checkout.component';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit, OnDestroy {

  // FOR UNSUBSCRIBING FROM SUBSCRIPTION
  private ngUnsubscribe: Subject<boolean> = new Subject<boolean>();

  public userId: string;
  public userName: string;
  public imageURL: string;
  public userEmail: string;

  // CART PRODUCTS OBSERVABLE FOR REALTIME UPDATE
  public cartItems$: Observable<Product[]>; // SUBSCRIBE TO PRODUCT CART ITEMS
  public getTotalAmount$: Observable<number>; // SUBSCRIBE TO PRODUCT CART TOTAL AMOUNT
  public products: Array<Product> = [];
  public cartAmnt: number;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private accountService: AccountService,
    private cartService: CartService
  ) { }





  // REMOVE PRODUCT FROM CART
  removeProduct(item: CartProduct): void {
    this.cartService.removeProductFromCart(item);
  }





  // OPEN CART DIALOG
  public openCartDialog(): void {
    const dialogRef = this.dialog.open(CheckoutComponent, {
      closeOnNavigation: true,
      disableClose: false,
      minWidth: 650,
      panelClass: 'nopaddingdialog',
      maxHeight: '80vh',
      width: '50%',
      maxWidth: 750,
      role: 'alertdialog',
      data: {
        cartAmount: this.cartAmnt
      }
    });
    dialogRef.afterClosed().subscribe((closed) => {
      // run on dialog closed
    });
  }





  // OPEN SIGNOUT DIALOG
  public openSignoutDialog(): void {
    const dialogRef = this.dialog.open(SignoutDialogComponent, {
      closeOnNavigation: true,
      disableClose: true,
      minWidth: 320,
      panelClass: 'nopaddingdialog',
      maxHeight: '80vh',
      width: '40%',
      maxWidth: 450,
      role: 'alertdialog',
      data: {}
    });
    dialogRef.afterClosed().subscribe((closed) => {
      // run on dialog closed
    });
  }





  ngOnInit() {
    this.imageURL = 'assets/img/profileImg.png';
    this.accountService.userId
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(userId => this.userId = userId);
    this.accountService.userName
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(name => this.userName = name);
    this.accountService.userEmail
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(email => this.userEmail = email);
    this.accountService.userImage
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(img => {
        if (img) {
          this.imageURL = SERVERURL + '/Uploads/profile-pic/download/' + img;
        } else {
          this.imageURL = 'assets/img/profileImg.png';
        }
      });

    this.cartItems$ = this.cartService.getCartItems();
    this.getTotalAmount$ = this.cartService.getCartTotalAmount();
    this.cartItems$.subscribe((products: CartProduct[]) => {
      this.products = products;
    });
    this.getTotalAmount$.subscribe(amt => this.cartAmnt = amt);
  }





  ngOnDestroy() {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
    this.ngUnsubscribe.unsubscribe();
  }

}

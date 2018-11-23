import { Component, OnInit, Inject, ViewChild, ElementRef, ChangeDetectorRef, AfterViewInit, OnDestroy } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account/account.service';
import { NgForm } from '@angular/forms';
import { CartService } from 'src/app/services/cart/cart.service';
import { Checkout } from '../../modalsl/checkout.modal';
import { Payment } from '../../modalsl/payment.modal';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
declare var stripe: any;
declare var elements: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, AfterViewInit, OnDestroy {

  // FOR UNSUBSCRIBING FROM SUBSCRIPTION
  private ngUnsubscribe: Subject<boolean> = new Subject<boolean>();

  public isLoading: boolean;

  @ViewChild('cardInfo') cardInfo: ElementRef;

  public card: any;
  public cardHandler = this.onChange.bind(this);
  public error: string;

  public userName: string;
  public userEmail: string;
  public cartAmount: number;

  constructor(
    private snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CheckoutComponent>,
    private cd: ChangeDetectorRef,
    private cartService: CartService
  ) {
    this.userName = this.data.userName;
    this.userEmail = this.data.userEmail;
    this.cartAmount = this.data.cartAmount;
  }





  onChange({ error }) {
    if (error) {
      this.error = error.message;
    } else {
      this.error = null;
    }
    this.cd.detectChanges();
  }





  async onSubmit() {
    this.isLoading = true;
    const { token, error } = await stripe.createToken(this.card);

    if (error) {
      console.log('Unable to generate token:', error);
      this.snackbar.open(
        'Token generation error. Please check connectivity',
        'CONNECTION ERROR',
        {
          duration: 5000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right'
        }
      );
      this.isLoading = false;
    } else {
      console.log('Token generation success! Go for payment process-->');
      // ...send the token to the your backend to process the charge
      const paymentData: Payment = {
        amount: this.cartAmount * 100,
        name: this.userName,
        email: this.userEmail,
        source: token.id
      };
      this.cartService.processPayment(paymentData)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((res: any) => {
          if (res.statusCode === 200 && res.code === 'OK') {
            this.isLoading = false;
            this.snackbar.open(
              'Payment successful!!',
              'OK',
              {
                duration: 5000,
                verticalPosition: 'bottom',
                horizontalPosition: 'right'
              }
            );
            this.cartService.cleanProductCart();
            this.dialogRef.close();
          }
        }, err => {
          console.log('Payment error: ', err);
          this.isLoading = false;
          this.snackbar.open(
            'Unable to process payment!',
            'OK',
            {
              duration: 5000,
              verticalPosition: 'bottom',
              horizontalPosition: 'right'
            }
          );
        });
    }
  }





  ngOnInit() {
    this.isLoading = false;
  }


  ngAfterViewInit() {
    const style = {
      base: {
        lineHeight: '24px',
        fontFamily: 'monospace',
        fontSmoothing: 'antialiased',
        fontSize: '19px',
        '::placeholder': {
          color: 'purple'
        }
      }
    };

    this.card = elements.create('card', { style });
    this.card.mount(this.cardInfo.nativeElement);

    this.card.addEventListener('change', this.cardHandler);
  }


  ngOnDestroy() {
    this.card.removeEventListener('change', this.cardHandler);
    this.card.destroy();

    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
    this.ngUnsubscribe.unsubscribe();
  }


}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { AccountService } from '../services/account/account.service';
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  // UNSUBSCRIBE FROM SUBSCRIPTION
  public ngUnsubscribe: Subject<boolean> = new Subject<boolean>();

  public loginFormGroup: FormGroup; // LOGIN FORM VALIDATORS
  public isSubmitted: Boolean = false; // TRUE WHEN FORM IS SUBMITTED

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService
  ) { }





  // INITIALIZE LOGIN FORM ON START
  initLoginForm(): void {
    this.loginFormGroup = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(EMAIL_REGEX)]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(18)]]
    });
  }





  // LOGIN METHOD
  onLogin(): void {
    // this.isSubmitted = true;
    // if (!this.loginFormGroup.valid) {
    //   return;
    // } else {
    //   console.log('form values: ', this.loginFormGroup.value);
    //   this.accountService.loginOnServer(this.loginFormGroup.value)
    //     .pipe(takeUntil(this.ngUnsubscribe))
    //     .subscribe((res) => {
    //       console.log('Login successful: ', res);
    //     }, (err: HttpErrorResponse) => {
    //       console.log(err.error);
    //       console.log(err.name);
    //       console.log(err.message);
    //       console.log(err.status);
    //     });
    //   this.isSubmitted = false;
    // }
  }





  // RUN ON START
  ngOnInit(): void {
    this.initLoginForm();
  }

  // RUN ON EXIT
  ngOnDestroy(): void {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
    this.ngUnsubscribe.unsubscribe();
  }

}

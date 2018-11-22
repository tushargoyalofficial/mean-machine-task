import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorStateMatcher } from '@angular/material';
import { AccountService } from '../services/account/account.service';
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

  // UNSUBSCRIBE FROM SUBSCRIPTION
  public ngUnsubscribe: Subject<boolean> = new Subject<boolean>();

  public registerFormGroup: FormGroup; // LOGIN FORM VALIDATORS
  public isSubmitted: Boolean = false; // TRUE WHEN FORM IS SUBMITTED
  public matcher1 = new ErrorStateMatcher(); // FOR ROLE SELECT

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService
  ) { }





  // INITIALIZE LOGIN FORM ON START
  initLoginForm(): void {
    this.registerFormGroup = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.pattern(EMAIL_REGEX)]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(18)]],
      status: ['active'],
      username: [null],
      realm: [null],
      mobile: [null],
      createdAt: [new Date()],
      updatedAt: [new Date()]
    });
  }





  // LOGIN METHOD
  onSignup(): void {
    this.isSubmitted = true;
    if (!this.registerFormGroup.valid) {
      return;
    } else {
      this.accountService.signupOnServer(this.registerFormGroup.value)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((res) => {
          console.log('signup successful: ', res);
        }, (err: HttpErrorResponse) => {
          console.log(err.error);
          console.log(err.name);
          console.log(err.message);
          console.log(err.status);
        });
      this.isSubmitted = false;
    }
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

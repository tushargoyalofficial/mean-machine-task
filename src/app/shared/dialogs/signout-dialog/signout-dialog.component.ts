import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AccountService } from 'src/app/services/account/account.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signout-dialog',
  templateUrl: './signout-dialog.component.html',
  styleUrls: ['./signout-dialog.component.scss']
})
export class SignoutDialogComponent implements OnInit, OnDestroy {

  public accessToken: string;

  // FOR UNSUBSCRIBING FROM SUBSCRIPTION
  private ngUnsubscribe: Subject<boolean> = new Subject<boolean>();

  constructor(
    private dialog: MatDialog,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<SignoutDialogComponent>,
    private accountService: AccountService
  ) { }





  // SIGNOUT USER
  public signout(): void {
    this.accountService.logoutUser({'id': this.accessToken})
      .subscribe((res) => {
        console.log(res);
        this.accountService.userAuthentic(false);
        this.accountService.setAuthId(null);
        this.accountService.setUserId(null);
        this.accountService.setRole(null);
        localStorage.clear();
        this.router.navigate(['/login']);
        this.dialogRef.close();
      }, err => console.log('Error in signout: ', err));
  }





  ngOnInit() {
    this.accountService.authId
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(accessToken => this.accessToken = accessToken);
  }


  ngOnDestroy() {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
    this.ngUnsubscribe.unsubscribe();
  }

}

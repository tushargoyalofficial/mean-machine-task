import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from './services/account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Mean Machine Task App';

  constructor(
    private router: Router,
    private snackbar: MatSnackBar,
    private accountService: AccountService
  ) { }


  private autoLogin(): void {
    const accessToken = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userId');
    if (accessToken) {
      this.accountService.checkUserInfo(accessToken, userId)
        .subscribe((res: any) => {
          if (res.id && res.role && res.status === 'active') {
            this.accountService.userAuthentic(true);
            this.accountService.setRole(res.role);
            this.router.navigate(['products']);
          } else {
            this.accountService.userAuthentic(false);
            this.accountService.setRole(null);
            localStorage.clear();
            this.router.navigate(['login']);
          }
        }, err => { console.log('Error in access token: ', err); });
    }
  }


  ngOnInit() {
    this.autoLogin();
  }
}

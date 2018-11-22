import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { SERVERURL } from '../config/api';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  public isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public userRole: BehaviorSubject<string> = new BehaviorSubject(null);

  constructor(
    private http: HttpClient
  ) { }



  // IF USER AUTHENTICATED, true ELSE false
  public userAuthentic(value: boolean): boolean {
    this.isAuthenticated.next(value);
    return this.isAuthenticated.value;
  }


  // SET USER ROLE
  public setRole(value: string) {
    this.userRole.next(value);
  }



  // LOGIN METHOD TO INTERACT WITH SERVER API
  loginOnServer(body: Object): Observable<any> {
    const url: string = SERVERURL + '/Accounts/login?include=["user"]';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Authorization': fooBarToken
      }),
      withCredentials: true // for set-cookie to work
    };
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json'
    // });
    return this.http.post(url, body, httpOptions);
  }




  // SIGNUP METHOD TO INTERACT WITH SERVER API
  signupOnServer(body: Object): Observable<any> {
    const url: string = SERVERURL + '/Accounts';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Authorization': fooBarToken
      }),
      // withCredentials: true // for set-cookie to work
    };
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json'
    // });
    return this.http.post(url, body, httpOptions);
  }




  // CHECK ACCESS TOKEN IS VALID OR NOT
  checkUserInfo(authId: string, userId: string): Observable<any> {
    const url: string = SERVERURL + '/Accounts/' + userId + '?access_token=' + authId;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.get(url, httpOptions);
  }

}

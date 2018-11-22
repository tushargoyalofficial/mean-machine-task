import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { SERVERURL } from '../config/api';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  public authId: BehaviorSubject<string> = new BehaviorSubject(null);
  public userId: BehaviorSubject<string> = new BehaviorSubject(null);

  public userName: BehaviorSubject<string> = new BehaviorSubject('');
  public userImage: BehaviorSubject<string> = new BehaviorSubject('');

  public isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public userRole: BehaviorSubject<string> = new BehaviorSubject(null);

  constructor(
    private http: HttpClient
  ) { }



  // SET AUTH ID FOR MAKING IT GLOBALLY ACCESSEBLE
  public setAuthId(value: string): void {
    this.authId.next(value);
  }


  // SET USER ID FOR MAKING IT GLOBALLY ACCESSEBLE
  public setUserId(value: string): void {
    this.userId.next(value);
  }


  // IF USER AUTHENTICATED, true ELSE false
  public userAuthentic(value: boolean): boolean {
    this.isAuthenticated.next(value);
    return this.isAuthenticated.value;
  }


  // SET USER NAME
  public setUserName(value: string): void {
    this.userName.next(value);
  }


  // SET USER IMAGE
  public setUserImage(value: string): void {
    this.userImage.next(value);
  }


  // SET USER ROLE
  public setRole(value: string) {
    this.userRole.next(value);
  }



  // LOGIN METHOD TO INTERACT WITH SERVER API
  public loginOnServer(body: Object): Observable<any> {
    const url: string = SERVERURL + '/Accounts/login?include=["user"]';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true // for set-cookie to work
    };
    return this.http.post(url, body, httpOptions);
  }




  // SIGNUP METHOD TO INTERACT WITH SERVER API
  public signupOnServer(body: Object): Observable<any> {
    const url: string = SERVERURL + '/Accounts';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post(url, body, httpOptions);
  }




  // CHECK ACCESS TOKEN IS VALID OR NOT
  public checkUserInfo(authId: string, userId: string): Observable<any> {
    const url: string = SERVERURL + '/Accounts/' + userId + '?access_token=' + authId;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.get(url, httpOptions);
  }




  // LOGOUT USER FROM SYSTEM
  public logoutUser(body: Object): Observable<any> {
    const url: string = SERVERURL + '/Accounts/logout?access_token=' + this.authId.value;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post(url, body, httpOptions);
  }

}

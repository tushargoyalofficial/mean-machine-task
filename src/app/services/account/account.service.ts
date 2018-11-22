import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVERURL } from '../config/api';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private http: HttpClient
  ) { }



  // LOGIN METHOD TO INTERACT WITH SERVER API
  loginOnServer(body: Object): Observable<any> {
    const url: string = SERVERURL + '/Accounts/login';
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
}

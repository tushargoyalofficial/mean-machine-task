import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { SERVERURL } from '../config/api';
import { AccountService } from '../account/account.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public authId: string;

  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) {
    this.accountService.authId.subscribe(authId => this.authId = authId);
  }




  // FETCH ALL PRODUCTS
  public fetchProducts(): Observable<any> {
    const url: string = SERVERURL + '/products?access_token=' + this.authId;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.get(url, httpOptions);
  }
}

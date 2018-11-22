import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { SERVERURL } from '../config/api';
import { AccountService } from '../account/account.service';
import { UserProfile } from 'src/app/shared/modalsl/user-profile.modal';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  public accessToken: string;
  public userId: string;

  constructor(
    private http: HttpClient,
    private accountService: AccountService,
  ) {
    this.accountService.authId.subscribe(authId => this.accessToken = authId);
    this.accountService.userId.subscribe(userId => this.userId = userId);
  }




  // UPLOAD USER IMAGE
  uploadImage(body: any): Observable<any> {
    const url = SERVERURL + '/Uploads/profile-pic/upload?access_token=' + this.accessToken;
    const fd: FormData = new FormData();
    fd.append('file', body);

    return this.http.post(url, fd)
      .pipe(
        map((res: Response) => res.json()),
        catchError((error: any) => Observable.throw(error.json().error || 'Server error'))
      );
  }




  // UPDATE USER INFO ON SERVER
  updateUserData(body: Object): Observable<UserProfile> {
    const url: string = SERVERURL + '/Accounts/' + this.userId + '?access_token=' + this.accessToken;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.patch(url, body, httpOptions);
  }
}

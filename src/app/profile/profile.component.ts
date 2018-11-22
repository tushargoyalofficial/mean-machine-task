import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Renderer } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProfileService } from '../services/profile/profile.service';
import { UserProfile } from '../shared/modalsl/user-profile.modal';
import { Upload } from '../shared/modalsl/upload.modal';
import { AccountService } from '../services/account/account.service';
import { SERVERURL } from '../services/config/api';
const NAME_REGEX = /^[A-Za-z ]+$/;
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  // FOR UNSUBSCRIBING FROM SUBSCRIPTION
  private ngUnsubscribe: Subject<boolean> = new Subject<boolean>();

  public userId: string;

  @ViewChild('uploadProfileImage') imageExplorer: ElementRef;
  public imageName: string; // SELECTED IMAGE NAME
  public imageObj: object; // SELECTED IMAGE FILE OBJECT

  public imageURL: String = 'assets/img/profileImg.png'; // LOGGED IN USER IMAGE IF ANY
  public isSubmitted: Boolean = false; // FORM SUBMITTED
  public isLoading: Boolean = false; // TRUE WHEN PROCESSING QUERY
  public userFormGroup: FormGroup; // USER FORM

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private renderer: Renderer,
    private accountService: AccountService,
    private profileService: ProfileService
  ) { }





  // OPEN IMAGE FILE EXPLORER
  triggerFilePicker() {
    const event = new MouseEvent('click');
    this.renderer.invokeElementMethod(this.imageExplorer.nativeElement, 'dispatchEvent', [event]);
  }


  // GET SELECTED FILE DETAILS
  getFile(event) {
    // FileList is array of multiple selected file
    const target = event.target || event.srcElement; // support for firefox file input
    const files = target.files[0];
    console.log('Selected file: ', files.name);
    console.log('Selected file object: ', target.files[0]);
    if (files !== undefined && files !== null && files !== '') {
      this.imageName = files.name;
      this.imageObj = files;
      // show image preview
      const reader = new FileReader();
      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = (event: any) => {
        this.imageURL = event.target.result; // set image url
      };
      reader.readAsDataURL(target.files[0]);
    }
  }





  // INITIALIZE FORMS
  private initUserForm(): void {
    this.userFormGroup = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern(NAME_REGEX)]],
      email: ['', [Validators.required, Validators.pattern(EMAIL_REGEX)]],
      updatedAt: [new Date()]
    });
  }





  // UPDATE USER VALUES ON SERVER
  public updateUserInfo(): void {
    this.isSubmitted = true;
    if (!this.userFormGroup.valid) {
      return;
    } else {
      this.isLoading = true;
      if (this.imageName && this.imageObj) {
        // FIRST UPLOAD IMAGE TO SERVER
        this.profileService.uploadImage(this.imageObj)
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((uploaded: Upload) => {
            console.log(uploaded);
            const data: UserProfile = this.userFormGroup.value;
            data.image = uploaded.result.files.file[0].name;
            // NOW UPDATE THE USER DATA
            this.profileService.updateUserData(data)
              .pipe(takeUntil(this.ngUnsubscribe))
              .subscribe((res: UserProfile) => {
                console.log('User data updated: ', res);
                this.accountService.setUserName(res.name);
                this.accountService.setUserEmail(res.email);
                this.accountService.setUserImage(res.image);
                this.isLoading = false;
              }, err => {
                console.log('User update error: ', err);
                this.isLoading = false;
              });
          }, err => console.log('Image upload error: ', err));
      } else {
        this.profileService.updateUserData(this.userFormGroup.value)
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((res: UserProfile) => {
            console.log('User data updated: ', res);
            this.accountService.setUserName(res.name);
            this.accountService.setUserEmail(res.email);
            this.accountService.setUserImage(res.image);
            this.isLoading = false;
          }, err => {
            console.log('User update error: ', err);
            this.isLoading = false;
          });
      }

      this.isSubmitted = false;
    }
  }






  ngOnInit() {
    this.initUserForm();

    this.route.params
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((params) => {
        this.userId = params.id;
        this.profileService.fetchUserInfo()
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((user: UserProfile) => {
            this.userFormGroup.controls['name'].setValue(user.name);
            this.userFormGroup.controls['email'].setValue(user.email);
            if (user.image) {
              this.imageURL = SERVERURL + '/Uploads/profile-pic/download/' + user.image;
            } else {
              this.imageURL = 'assets/img/profileImg.png';
            }
          }, err => console.log('Error fetching user info: ', err));
      });
  }


  ngOnDestroy() {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
    this.ngUnsubscribe.unsubscribe();
  }

}

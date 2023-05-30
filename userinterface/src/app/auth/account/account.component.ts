import {ProfileService} from './../profile.service';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {OrderService} from "../../order/order.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {faEyeSlash} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit, OnDestroy {

  user: any;
  userSubscribe: any;
  uid: any;
  orders: any;
  email: any;
  pass = faEyeSlash;
  public hide = true;
// attachemnt files ==============================
  ProfilePhotoUploadProgress: any;
  ProfilePhotoUploadErrorMessage: any;
  ProfilePhotoUploadinfoMessage: any;
  isUploadingProfilePhoto: boolean = false;
  isProfilePhotoChoosen: boolean = false;
  ProfilePhotoFile: any;
  ProfilePhotoUrl: any = './assets/img/avatars/profile.png';
  ProfilePhotoFileName: string = 'No file selected';

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private profileService: ProfileService,
    private orderService: OrderService,
    private modalService: NgbModal,
    private snacbar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {

    this.loadAccount();
    this.loadMyOrder();
    this.uid = this.authService.getId();

  }

  loadAccount() {
    this.userSubscribe = this.route.data.subscribe((data) => {
      this.user = data['data'][0];
      this.ProfilePhotoUrl = data['data'][0].image;
      console.log(this.user);
    });

  }

  loadMyOrder() {
    this.orderService.getMyOrder().subscribe(data => {
        console.log(data);
        this.orders = data;
      },
      error => {
        console.log(error)
      })
  }

  // console.log(this.fromContext.country[this.palyer_address.country_id]);

  userForm = new FormGroup({
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('',),
    phone: new FormControl('',),
    date_of_birth: new FormControl(),
    gender: new FormControl('male',),
    city: new FormControl('',),
    zipcode: new FormControl('',),
    address: new FormControl('',),
  });

  edit_Photo_Dialog(content: any) {
    this.modalService.open(content, {
      size: 'md',
      backdrop: 'static',
      keyboard: false,
    });
  }

  // change or choose photos

  onChangeProfilePhoto(files: any) {
    let file = files[0];

    this.ProfilePhotoUploadErrorMessage = null;
    if (file) {
      this.isProfilePhotoChoosen = true;
      this.ProfilePhotoFileName = file.name;
      this.ProfilePhotoFile = file;
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (event) => {
        this.ProfilePhotoUrl = reader.result;
      };
    }
  }

  // cancel photos

  onCancelProfilePhoto() {
    this.ProfilePhotoUrl = this.user.image;
    this.isProfilePhotoChoosen = false;
  }


  // upload profile  photo

  onProfilePhotoUpload(model: any) {
    this.ProfilePhotoUploadinfoMessage = 'Upload in Progress...............';
    // this.infoMessage = null;
    this.ProfilePhotoUploadProgress = 0;
    this.isUploadingProfilePhoto = true;
    const formData = new FormData();
    formData.append('image', this.ProfilePhotoFile);
    this.profileService.updateUser(this.uid, formData)
      .subscribe((postData) => {
        this.router.navigate(['/auth/account']);
        this.isUploadingProfilePhoto = false;
        this.ProfilePhotoUploadinfoMessage = postData;
        this.isProfilePhotoChoosen = false;
        model.dismiss('Cross click')
        this.snacbar.open('Updated  ', 'X', {duration: 2000});
      });
    ;
  }


  edit_user_Dialog(content: any) {

    this.userForm.reset();
    this.userForm.controls['first_name'].setValue(this.user.first_name);
    this.userForm.controls['last_name'].setValue(this.user.last_name);
    this.userForm.controls['phone'].setValue(this.user.phone);
    this.userForm.controls['date_of_birth'].setValue(this.user.date_of_birth);
    this.userForm.controls['gender'].setValue(this.user.gender);
    this.userForm.controls['city'].setValue(this.user.city);
    this.userForm.controls['zipcode'].setValue(this.user.zipcode);
    this.userForm.controls['address'].setValue(this.user.address);

    // this.userForm.markAsPristine();
    this.userForm.markAsUntouched();
    this.modalService.open(content, {
      size: 'xl',
      backdrop: 'static',
      keyboard: false,
    });
  }

  // this.profileService.updateUser(this.uid, userObj);
  on_update_user(model: any) {
    let submittedData = {
      first_name: this.userForm.value['first_name'],
      last_name: this.userForm.value['last_name'],
      phone: this.userForm.value['phone'],
      date_of_birth: this.userForm.value['date_of_birth'],
      gender: this.userForm.value['gender'],
      city: this.userForm.value['city'],
      zipcode: this.userForm.value['zipcode'],
      address: this.userForm.value['address'],
    };

    this.profileService.updateUser(this.uid, submittedData)
      .subscribe((postData) => {
        this.router.navigate(['/auth/account']);
        this.isUploadingProfilePhoto = false;
        this.ProfilePhotoUploadinfoMessage = postData;
        this.isProfilePhotoChoosen = false;
        model.dismiss('Cross click')
        this.snacbar.open('Updated  ', 'X', {duration: 2000});
      });

  }

  edit_email_Dialog(content: any) {
    this.email = this.user.email;
    this.modalService.open(content, {
      size: 'xl',
      backdrop: 'static',
      keyboard: false,
    });
  }

  on_update_user_email(email: string, pass: string, model: any) {

    this.authService.changeEmail(email, pass).subscribe(
      (HttpResponse) => {
        model.dismiss('Cross click');
        this.router.navigate(['/auth/account']);
        this.snacbar.open('email changed ', 'X', {duration: 2000});
      },
      (error) => {
        let err = JSON.stringify(error.error);
        err = err.split(':')[1];
        this.snacbar.open(err, 'X');
      }
    );
  }

  ngOnDestroy(): void {
    this.userSubscribe.unsubscribe();
  }


}

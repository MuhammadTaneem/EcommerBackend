import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { faUnlock , faEyeSlash} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  pass = faEyeSlash;
  public isLoading = false;
  public hide = true;
  changePassForm = new FormGroup({
    // email: new FormControl('', [Validators.required]),
    oldPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    password1: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    password2: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor(
    public authService: AuthService,
    public route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {}

  private from = {
    current_password: '',
    new_password: '',
    re_new_password: '',
  };

  // ngOnInit(): void {}
  onSubmit() {
    this.from.current_password = this.changePassForm.value['oldPassword'] || '';
    this.from.new_password = this.changePassForm.value['password1'] || '';
    this.from.re_new_password = this.changePassForm.value['password2'] || '';
    this.authService.changePass(this.from);
    this.changePassForm.reset();
  }

  // onSubmit() {
  //   let opass = this.changePassForm.value['oldPassword'];
  //   let pass1 = this.changePassForm.value['password1'];
  //   let pass2 = this.changePassForm.value['password2'];

  //   this.authService.changePass(opass, pass1, pass2);
  //   console.log(opass, pass1, pass2);
  //   this.changePassForm.reset();
  //   console.log(this.changePassForm);

  // }
  onCencel(){
    this.authService.backClicked();
    // this.router.navigate([localStorage.getItem('redirectUrl')]);
  }

}

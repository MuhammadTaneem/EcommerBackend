import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { faUnlock , faEyeSlash} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  pass = faEyeSlash;
  public isLoading = false;
  public hide = true;
  forgetFrom = new FormGroup({
    // email: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [
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

  onSubmit() {
    let email = this.forgetFrom.value['email'] ||' ';
    this.authService.resetPassword(email);
    this.forgetFrom.reset();
    console.log(email);
  }

}

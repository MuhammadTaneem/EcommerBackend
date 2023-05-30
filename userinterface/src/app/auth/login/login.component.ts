import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { faUnlock , faEyeSlash} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  pass = faEyeSlash;
  public isLoading = false;
  public hide = true;
  loginFrom = new FormGroup({
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
    let email = this.loginFrom.value['email'] || '';
    let pass = this.loginFrom.value['password']|| '';
    this.authService.login(email, pass);
    this.loginFrom.reset();
    console.log(this.loginFrom);
    console.log(email);
  }

}

import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {faUnlock, faEyeSlash} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  pass = faEyeSlash;
  public isLoading = false;
  public hide = true;
  registerFrom = new FormGroup({
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('',),
    phone: new FormControl('',),
    date_of_birth: new FormControl(),
    gender: new FormControl('male',),
    city: new FormControl('',),
    zipcode: new FormControl('',),
    address: new FormControl('',),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    let first_name = this.registerFrom.value['first_name'];
    let last_name = this.registerFrom.value['last_name'];
    let phone = this.registerFrom.value['phone'];
    let date_of_birth = this.registerFrom.value['date_of_birth'];
    let gender = this.registerFrom.value['gender'];
    let city = this.registerFrom.value['city'];
    let zipcode = this.registerFrom.value['zipcode'];
    let address = this.registerFrom.value['address'];
    let email = this.registerFrom.value['email'];
    let password = this.registerFrom.value['password'];


    // this.authService.createUser ({
    //   this.registerFrom.value['first_name'],
    //   this.registerFrom.value['last_name'],
    //   this.registerFrom.value['phone'],
    //   this.registerFrom.value['date_of_birth'] ,
    //   this.registerFrom.value['gender'],
    //   this.registerFrom.value['city'],
    //   this.registerFrom.value['zipcode'],
    //   this.registerFrom.value['address'] ,
    //   this.registerFrom.value['email'],
    //   this.registerFrom.value['password']});

    this.authService.createUser({
      first_name, last_name, phone, date_of_birth,
      gender, city, zipcode, address, email, password
    });
    console.log(
      first_name, last_name, phone, date_of_birth,
      gender, city, zipcode, address, email, password);
    this.registerFrom.reset();
  }

}

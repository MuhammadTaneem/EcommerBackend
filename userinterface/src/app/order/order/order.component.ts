import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {AuthService} from "../../auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ProfileService} from "../../auth/profile.service";
import {DashbordService} from "../../dashbord/dashbord.service";
import {OrderService} from "../order.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ]
})
export class OrderComponent implements OnInit {


  quantity = 1;
  price = 0;
  uid: any;
  profile: any;

  userSubscribe: any;
  carts: { id: number, author: number, product_id: number, product_img: string, product_name: string, product_price: number, quantity: number } [] = [];
  addresform = this._formBuilder.group({
    phone: ['', Validators.required],
    address: ['', Validators.required],
  });
  paymentform = this._formBuilder.group({
    pay: ['', Validators.required],
  });

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private profileService: ProfileService,
    private dashbordService: DashbordService,
    private _formBuilder: FormBuilder,
    private orderService: OrderService
  ) {
  }

  ngOnInit(): void {

    this.loadData();
    this.priceCalulator();
  }

  priceCalulator() {
    this.price = 0;
    for (let i = 0; i < this.carts.length; i++) {
      this.price += this.carts[i].product_price;
    }
  }

  loadData() {
    this.userSubscribe = this.route.data.subscribe((data) => {
      // console.log(data);
      this.carts = data['data'];
      console.log(this.carts);
    });
    this.getProfile()

  }

  Onsubmit() {
    this.router.navigate(['/'])
    for (let i = 0; i < this.carts.length; i++) {
      this.orderService.makeOrder({
        quantity: this.carts[i].quantity,
        author: localStorage.getItem('uid'),
        product: this.carts[i].product_id,
        product_img: this.carts[i].product_img,
        product_name: this.carts[i].product_name,
        cart_id: this.carts[i].id,
        phone: this.addresform.value['phone'],
        address: this.addresform.value['address'],

      })
    }
  }

  getProfile() {
    this.uid = this.authService.getId();
    this.profileService.getProfile(this.uid).subscribe(data => {
      this.profile = data;

      this.addresform.setValue({
        phone: this.profile[0].phone,
        address: this.profile[0].address
      })
      // console.log(this.profile[0].phone, this.profile[0].address);
    })

  }

}

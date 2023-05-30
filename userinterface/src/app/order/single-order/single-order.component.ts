import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {AuthService} from "../../auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ProfileService} from "../../auth/profile.service";
import {DashbordService} from "../../dashbord/dashbord.service";
import {OrderService} from "../order.service";

@Component({
  selector: 'app-single-order',
  templateUrl: './single-order.component.html',
  styleUrls: ['./single-order.component.scss']
})
export class SingleOrderComponent implements OnInit {

  quantity = 1;
  id:number =0;
  name :any = '';
  image :any = '';
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

    this.getProfile()

    // this.priceCalulator();
  }

  // priceCalulator() {
  //   this.price = 0;
  //   for (let i = 0; i < this.carts.length; i++) {
  //     this.price += this.carts[i].product_price;
  //   }
  // }

  loadData() {
    // this.route.params.subscribe((params: Params) => {
    //   this.product = params['product'];
    //   console.log(this.product);
    //
    // });

    // this.product = this.route.snapshot.queryParamMap.get("product");
    // this.product = this.route.snapshot.paramMap.get('product');

     this.id  = Number(localStorage.getItem('product_id')) ;
    this.name  =  localStorage.getItem('product_name');
    this.image  =  localStorage.getItem('product_image');
    this.price  =Number( localStorage.getItem('product_price'));
    console.log(name);
  }

  Onsubmit() {
    this.router.navigate(['/'])
    this.orderService.orderNow({
      quantity: 1,
      author: localStorage.getItem('uid'),
      product: this.id,
      product_img:this.image,
      product_name: this.name,
      phone: this.addresform.value['phone'],
      address: this.addresform.value['address'],

    })
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

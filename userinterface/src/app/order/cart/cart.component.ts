import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {faMinus, faPlus} from '@fortawesome/free-solid-svg-icons';
import {AuthService} from 'src/app/auth/auth.service';
import {ProfileService} from 'src/app/auth/profile.service';
import {DashbordService} from "../../dashbord/dashbord.service";
import {OrderService} from "../order.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  plush = faPlus;
  minus = faMinus;


  quantity = 1;
  price = 0;
  subprice = this.price;

  userSubscribe: any;
  carts: { id: number, author: number, product_id: number, product_img: string, product_name: string, product_price: number, quantity: number } [] = [];

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private profileService: ProfileService,
    private dashbordService: DashbordService,
    private orderService: OrderService
  ) {
  }

  ngOnInit(): void {
    this.loadData();
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
      this.priceCalulator();
      console.log(this.carts);
    });
  }

  incriment(index: number) {
    this.update_cart(index, (this.carts[index].quantity) + 1)
  }

  decriment(index: number) {
    if (this.carts[index].quantity > 1) {
      this.update_cart(index, (this.carts[index].quantity) - 1)
    } else {
      this.remove_from_cart(this.carts[index].id, index);
    }

  }


  remove_from_cart(id: number, index: number) {
    this.carts.splice(index, 1);
    this.orderService.remove_from_cart(id);
  }

  update_cart(index: number, quantity: number) {
    let id = this.carts[index].id;
    let data = {
      id: id,
      quantity: quantity,
      product_id: this.carts[index].product_id,
      author: 1,
    }
    this.orderService.update_cart(id, data);
  }

  ngOnDestroy(): void {
    this.userSubscribe.unsubscribe();
  }


}






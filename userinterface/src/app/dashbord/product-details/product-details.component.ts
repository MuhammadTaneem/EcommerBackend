import {DashbordService} from './../dashbord.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {faStar} from '@fortawesome/free-solid-svg-icons';
import {AuthService} from "../../auth/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {OrderService} from "../../order/order.service";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  productsSubscribe: any;
  product: any;
  ratting: any;
  currentRate = 0;
  star = faStar;

  imageObject: {
    image: string,
    thumbImage: string,
    title: string | null
  }[] = []

  ability = 'out of stock'
  ab_color = 'redangerd'
  stars: number[] = [0, 0, 0, 0, 0]
  rating = 4;
  rattingboxHide: boolean = false;
  // out of stock
  authStatus: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dashbordService: DashbordService,
    private authService: AuthService,
    private snacbar: MatSnackBar,
    private orderService: OrderService
  ) {
  }

  ngOnInit(): void {
    this.loadData();
    this.loggedIN();
  }

  // islogged(){
  //   this.authService.haveTokenLisenter().subscribe(data=>{
  //     console.log("commimg...................");
  //
  //     this.authStatus = data;
  //     console.log(this.authStatus);
  //   })
  // }

  loggedIN(){
    if(localStorage.getItem('token')){
      this.authStatus =  true;
    }

  }

  // loggedIN() {
  //   this.authService.haveTokenLisenter().subscribe(data => {
  //     this.authStatus = data;
  //     console.log(data);
  //   })
  // }


  loadData() {
    this.productsSubscribe =
      this.route.data.subscribe((data) => {
        this.product = data['data'][0];
        this.ratting = data['data'][1];
        console.log(this.ratting);
        this.setImage();
        this.abilityfunc(this.product.quantity)
        console.log(this.product);
      });

  }

  loadRatting() {
    this.dashbordService.invoke_product_ratting(this.product.id).subscribe(data => {
      this.ratting = data;
    })
  }

  abilityfunc(q: number) {

    this.ability = 'out of stock ';
    this.ab_color = 'danger';
    if (q > 0) {
      this.ability = 'available';
      this.ab_color = 'success';
    }

  }


  counter(str: number = -1) {
    for (let i = 0; i < str; i++) {
      this.stars[i] = 1;
    }
    console.log(this.stars);

  }


  setImage() {

    this.imageObject.push({image: this.product.product_img1, thumbImage: this.product.product_img1, title: ''});
    this.imageObject.push({image: this.product.product_img2, thumbImage: this.product.product_img2, title: ''});
    this.imageObject.push({image: this.product.product_img3, thumbImage: this.product.product_img3, title: ''});
    this.imageObject.push({image: this.product.product_img4, thumbImage: this.product.product_img4, title: ''});
  }

  // Onsubmit(ratted_star:number,comment:string){
  //     console.log(ratted_star,comment,this.product.id);

  // }


  private from: any = {
    star: 0,
    product: 0,
    comment: '',
    author: this.authService.getId()
  };

  // ngOnInit(): void {}
  Onsubmit(ratted_star: number, comment: string) {



    if (this.authStatus) {
      this.currentRate = 0;
      this.rattingboxHide = false;

      this.dashbordService.set_ratting(ratted_star, comment, this.product.id).subscribe(
        (HttpResponse) => {
          this.snacbar.open('successfully ratted ', 'X', {
            duration: 2000,
          });
          this.loadRatting();
        },
        (error) => {
          let err = JSON.stringify(error.error);
          console.log(err)
          err = err.split(':')[1];
          err = err.slice(1, -4);
          this.snacbar.open(err, 'X');
        }
      );

    } else {
      this.router.navigate(['/auth/login']);
    }


  }


  OnAddToCart(order: boolean) {
    console.log(this.authStatus);
    if (this.authStatus) {
      if(order){
        localStorage.setItem('product_id', this.product.id);
        localStorage.setItem('product_name', this.product.name);
        localStorage.setItem('product_price', this.product.price);
        localStorage.setItem('product_image', this.product.product_img1);
        // this.router.createUrlTree(['/order/single/']);
        this.router.navigate(['/order/single/'+this.product.id+'/']);
      }
      else{
      this.orderService.add_to_cart(this.product.id, order);
      }
    } else {
      this.router.navigate(['/auth/login']);
    }
  }
}

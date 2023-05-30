// import {Product, Ratting} from './dashbord.model';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthService} from "../auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  BACKEND_URL = environment.apiUrl + 'api/';

  constructor(
    private http: HttpClient,
    private snacbar: MatSnackBar,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }


  add_to_cart(id: number, order: boolean) {
    let uid = this.authService.getId();
    this.http.post<{}>(this.BACKEND_URL + 'cart/', {product_id: id, author: uid, quantity: 1}).subscribe(
      (HttpResponse) => {
        this.snacbar.open('successfully add to cart ', 'X', {
          duration: 2000,
        });

        if (order) {
          this.router.navigate(['/order/single']);
        }
        if (!order) {
          this.router.navigate(['/order/cart']);
        }
      },
      (error) => {
        let err = JSON.stringify(error.error);
        err = err.split(':')[1];
        err = err.slice(1, -3);
        this.snacbar.open(err, 'X');
      }
    );
  }



  update_cart(id: number, data: {}) {

    this.http.put<{}>(this.BACKEND_URL + 'cart/' + id + '/', data).subscribe(
      (HttpResponse) => {
        this.snacbar.open('successfully updated cart ', 'X', {
          duration: 2000,
        });
        console.log(HttpResponse)
        this.router.navigate(['/order/cart']);
      },
      (error) => {
        // this.refresh();
        this.router.navigate(['/order/cart']);
        console.log(error)
        let err = JSON.stringify(error.error);
        err = err.split(':')[1];
        err = err.slice(1, -2);
        this.snacbar.open(err, 'X');
      }
    );
  }

  remove_from_cart(id: number) {

    this.http.delete<{}>(this.BACKEND_URL + 'cart/' + id + '/').subscribe(
      (HttpResponse) => {
        this.snacbar.open('successfully remove from cart ', 'X', {
          duration: 2000,
        });
        this.router.navigate(['/order/cart']);
      },
      (error) => {
        let err = JSON.stringify(error.error);
        err = err.split(':')[1];
        err = err.slice(1, -4);
        this.snacbar.open(err, 'X');
      }
    );
  }

  makeOrder(data: {}) {
    this.http.post<{}>(this.BACKEND_URL + 'orders/cart/', data).subscribe(data => {
      console.log(data);
      this.snacbar.open('Order success', 'X', {
        duration: 2000,
      });

    }, (error) => {
      let err = JSON.stringify(error.error);
      err = err.split(':')[1];
      err = err.slice(1, -2);
      this.snacbar.open(err, 'X');
    })
  }

  orderNow(data: {}) {
    this.http.post<{}>(this.BACKEND_URL + 'orders/single/', data).subscribe(data => {
      console.log(data);
      this.snacbar.open('Order success', 'X', {
        duration: 2000,
      });

    }, (error) => {
      let err = JSON.stringify(error.error);
      err = err.split(':')[1];
      err = err.slice(1, -2);
      this.snacbar.open(err, 'X');
    })
  }

  getMyOrder(all='single') {
    const queryParams = `?all=${all}`;
    return this.http.get<{}>(this.BACKEND_URL + 'orders/cart/'+queryParams);
  }

}

import {Product, Ratting} from './dashbord.model';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Subject} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthService} from "../auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductsComponent} from "./products/products.component";

@Injectable({
  providedIn: 'root'
})
export class DashbordService {


  // products = new Subject<{product:Product;count: number }>();
  products = new Subject<{ product: Product }>();


  // categories: Category[]=[]


  constructor(
    private http: HttpClient,
    private snacbar: MatSnackBar,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }


  //  apiurl
  // apiurl = 'http://127.0.0.1:8000/api/products/category/';
  BACKEND_URL = environment.apiUrl + 'api/';


  invoke_products(
    s: string = '',
    page: number = 1,
    page_size: number = 30) {
    console.log(s, 'asdfasdfdsaf');
    const queryParams = `?search=${s}&page=${page}&page_size=${page_size}`;
    this.http.get<Product>(
      this.BACKEND_URL + 'products/list/' + queryParams
    ).subscribe(productsData => {
      this.products.next({product: productsData});
      console.log(productsData);
    });
  }


  get_filter_product(id:number){
    const queryParams = `?id=${id}`;
    this.http.get<Product>(
      this.BACKEND_URL + 'products/fcat' + queryParams
    ).subscribe(productsData => {
      this.products.next({product: productsData});
      console.log(productsData);
    });

  }

  // invoke_products(
  //   s: string = '',
  //   page: number = 1,
  //   page_size: number = 10,){
  //   console.log(s,'asdfasdfdsaf');
  //   const queryParams = `?search=${s}&page=${page}&page_size=${page_size}`;
  //   this.http.get<{product:Product; results:any; count:number}>(
  //     this.BACKEND_URL+'products/list/'+ queryParams
  //   ).subscribe(productsData=>{
  //     this.products.next({product : productsData.results, count:productsData.count});
  //     console.log(productsData);
  //   });
  // }


  //   invoke_products(){
  //   this.http.get<{id: number,
  //     name : string,
  //     description: string,
  //     weight: string,
  //     quantity: number,
  //     color: string,
  //     brand:string,
  //     model:string,
  //     price: number,
  //     size:string,
  //     product_img: string,
  //     author: number,
  //     product_category: number}>(
  //     this.BACKEND_URL+'products/list/'
  //   ).subscribe(productsData=>{
  //     this.products.next(productsData);
  //     console.log(productsData);
  //   });
  // }

  // invoke_products(){
  //   return this.http.get<Product>(
  //     this.BACKEND_URL+'products/list/'
  //   );
  // }


  invoke_product_details(pk: string) {
    return this.http.get<Product>(
      this.BACKEND_URL + 'products/list/' + pk
    );
  }

  invoke_product_ratting(pk: string) {
    const queryParams = `?id=${pk}`;
    return this.http.get<Ratting>(
      this.BACKEND_URL + 'ratting/' + queryParams
    );
  }

  set_ratting(ratted_star: number, comment: string, product_id: number) {

    let formData = new FormData();
    formData.append('star', ratted_star.toString());
    formData.append('product', product_id.toString());
    formData.append('comment', comment);
    formData.append('author', '1');

    const headers = new HttpHeaders().set('Authorization', `jwt ${this.authService.getToken()}`);

    return this.http.post<{}>(this.BACKEND_URL + 'ratting/', formData, {headers: headers})
  }

  // changePass(form: any) {
  //   this.http
  //     .post<{}>(this.BACKEND_URL + 'users/set_password/', form)
  //     .subscribe(
  //       (HttpResponse) => {
  //         this.snacbar.open('successfully changed your password ', 'X', {
  //           duration: 2000,
  //         });
  //         this.router.navigate(['/']);
  //       },
  //       (error) => {
  //         let err = JSON.stringify(error.error);
  //         err = err.split(':')[1];
  //         err = err.slice(1, -4);
  //         this.snacbar.open(err, 'X');
  //       }
  //     );
  // }

  get_products() {
    return this.products.asObservable();
  }


  refresh() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }


  // getposts(
  //   s: string = '',
  //   page: number = 1,
  //   page_size: number = 10,
  //   user: string = ''
  // ) {
  //   const queryParams = `?search=${s}&page=${page}&page_size=${page_size}&user=${user}`;
  //   if (user) {
  //     this.http
  //       .get<{ viewPost: ViewPost[]; results: any; count: number }>(
  //         this.BACKEND_URL + 'userposts/' + queryParams
  //       )
  //       .subscribe((postData) => {
  //         this.viewPost = postData.results;
  //         this.loadPostImage(postData.count);
  //       });
  //   } else {
  //     this.http
  //       .get<{ viewPost: ViewPost[]; results: any; count: number }>(
  //         this.BACKEND_URL + 'postlist/' + queryParams
  //       )
  //       .subscribe((postData) => {
  //         this.viewPost = postData.results;
  //         this.loadPostImage(postData.count);
  //       });
  //   }
  // }


}

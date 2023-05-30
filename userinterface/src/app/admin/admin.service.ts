import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Category} from "../dashbord/dashbord.model";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  BACKEND_URL = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private snacbar: MatSnackBar,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }



  chnageOrderStatus(data: {}, id: number) {
    this.http.put<{}>(this.BACKEND_URL + `api/orders/cart/${id}/?update=update`, data).subscribe(data => {
      console.log(data);
      this.snacbar.open('Order Status change successfully', 'X', {
        duration: 2000,
      });

    }, (error) => {
      let err = JSON.stringify(error.error);
      err = err.split(':')[1];
      err = err.slice(1, -2);
      this.snacbar.open(err, 'X');
    })
  }

  get_all_user() {
    const access = this.authService.getToken();
    console.log(this.authService.getToken());
    const headers = new HttpHeaders().set('Authorization', `jwt ${access}`);
    return this.http.get<{}>(`${this.BACKEND_URL}api/profile/`, {headers: headers});
  }

  upload_product(file1: File, file2: File, file3: File, file4: File, product: any) {
    // api/products/list/

    let formData = new FormData();
    formData.append("product_img1", file1);
    if (file2) {
      formData.append("product_img2", file2);
    }
    if (file3) {
      formData.append("product_img3", file3);
    }
    if (file4) {
      formData.append("product_img4", file4);
    }

    for (let key in product) {
      // iterate and set other form data
      formData.append(key, product[key])
    }


    const access = this.authService.getToken();
    // console.log(this.authService.getToken());
    let headers = new HttpHeaders().set('Authorization', `jwt ${access}`);
    console.log(formData);
    this.http.post<{}>(this.BACKEND_URL + `api/products/list/`, formData, {headers: headers}).subscribe(data => {
      console.log(data);
      this.snacbar.open('Product added successfully', 'X', {
        duration: 2000,
      });

    }, (error) => {
      console.log(error)
      let err = JSON.stringify(error.error);
      err = err.split(':')[1];
      err = err.slice(1, -2);
      this.snacbar.open(err, 'X');
    })
  }

  updateProduct(id:number, file1: any, file2: any, file3: any, file4: any, product: any){

    let formData = new FormData();
    for (let key in product) {
      console.log("appending....");
      formData.append(key, product[key])
    }
    console.log(formData);

    if(file1){
      formData.append("product_img1", file1);
    }
    if (file2) {
      formData.append("product_img2", file2);
    }
    if (file3) {
      formData.append("product_img3", file3);
    }
    if (file4) {
      formData.append("product_img4", file4);
    }

    const access = this.authService.getToken();
    // console.log(this.authService.getToken());
    let headers = new HttpHeaders().set('Authorization', `jwt ${access}`);
    console.log(product);

    this.http.put<{}>(this.BACKEND_URL + `api/products/list/${id}/`, formData, {headers: headers}).subscribe(data => {
      console.log(data);
      this.snacbar.open('Product updated successfully', 'X', {
        duration: 2000,
      }
      );

    }, (error) => {
      console.log(error)
      let err = JSON.stringify(error.error);
      err = err.split(':')[1];
      err = err.slice(1, -2);
      this.snacbar.open(err, 'X');
    })
  }


  deleteProduct(id:number){

    const access = this.authService.getToken();
    // console.log(this.authService.getToken());
    let headers = new HttpHeaders().set('Authorization', `jwt ${access}`);

    this.http.delete<{}>(this.BACKEND_URL + `api/products/list/${id}/`, {headers: headers}).subscribe(data => {
      console.log(data);
      this.refresh();
      this.snacbar.open('Product deleted successfully', 'X', {
          duration: 2000,
        }
      );

    }, (error) => {
      console.log(error)
      let err = JSON.stringify(error.error);
      err = err.split(':')[1];
      err = err.slice(1, -2);
      this.snacbar.open(err, 'X');
    })

  }

  add_category(category:string,file1:any){
    const access = this.authService.getToken();
    let headers = new HttpHeaders().set('Authorization', `jwt ${access}`);


    let formData = new FormData();

    formData.append('name', category)
    console.log(formData);
    if(file1){
      formData.append("cat_img", file1);
    }

    this.http.post<{}>(
      this.BACKEND_URL+`api/products/category/`,formData,
      {headers: headers}).subscribe(data => {
      console.log(data);
      // this.refresh();
      this.snacbar.open('Create Category successfully', 'X', {
          duration: 2000,
        }
      );

    }, (error) => {
      console.log(error)
      let err = JSON.stringify(error.error);
      err = err.split(':')[1];
      err = err.slice(1, -2);
      this.snacbar.open(err, 'X');
    })
  }

  edit_category(category:any,file1:any){
    const access = this.authService.getToken();
    let headers = new HttpHeaders().set('Authorization', `jwt ${access}`);

    // let category_name = {
    //   name:category.name
    // }

    let formData = new FormData();

    formData.append('name', category.name)
    console.log(formData);
    if(file1){
      formData.append("cat_img", file1);
    }

    this.http.put<{}>(
      this.BACKEND_URL+`api/products/category/${category.id}/`,formData,
      {headers: headers}).subscribe(data => {
      console.log(data);
      // this.refresh();
      this.snacbar.open('Category update successfully', 'X', {
          duration: 2000,
        }
      );

    }, (error) => {
      console.log(error)
      let err = JSON.stringify(error.error);
      err = err.split(':')[1];
      err = err.slice(1, -2);
      this.snacbar.open(err, 'X');
    })
  }

  delete_category(id:number){
    const access = this.authService.getToken();
    let headers = new HttpHeaders().set('Authorization', `jwt ${access}`);

    this.http.delete<{}>(
      this.BACKEND_URL+`api/products/category/${id}/`,
      {headers: headers}).subscribe(data => {
      console.log(data);
      this.refresh();
      this.snacbar.open('Category deleted successfully', 'X', {
          duration: 2000,
        }
      );

    }, (error) => {
      console.log(error)
      let err = JSON.stringify(error.error);
      err = err.split(':')[1];
      err = err.slice(1, -2);
      this.snacbar.open(err, 'X');
    })
  }

  refresh() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }
}

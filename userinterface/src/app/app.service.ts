import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';
import { Subject } from 'rxjs';
import {Category} from'./dashbord/dashbord.model';
@Injectable({
  providedIn: 'root'
})
export class AppService {


  categories = new Subject<Category>();
  // categories: Category[]=[]


  constructor(  
      private http: HttpClient,
      ) { }


  //  apiurl 
  // apiurl = 'http://127.0.0.1:8000/api/products/category/';
  BACKEND_URL = environment.apiUrl + 'api/';


  // navbar 

  // getnavitems(){
  //   return this.http.get<Category>(
  //     this.BACKEND_URL+'products/category/'
  //   ).subscribe((navItems)=>{
  //     this.categories.next(navItems);
  //     console.log(navItems);
  //     // return  this.get_categories();
  //   })
  // }

  getnavitems(){
    return this.http.get<Category>(
      this.BACKEND_URL+'products/category/'
    )
  }

  



  get_categories() {
    this.getnavitems();

    // this.http.get<Category>(
    //   this.BACKEND_URL+'products/category/'
    // ).subscribe((navItems)=>{
    //   // this.categories = navItems;
    //   this.categories.next(navItems)
    //   // console.log(this.categories.slice());
    //   // return [...this.categories];
    //   // return this.categories.slice();
    // })

    return this.categories.asObservable();
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

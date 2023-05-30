import { DashbordService } from './dashbord.service';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  ActivatedRoute
} from '@angular/router';
import { forkJoin, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PdetailsResolver implements Resolve<boolean> {

  id :any;
  imageObject :{
    image: string,
    thumbImage: string,
    title: string|null
}[]=[]

  constructor (
    private  dashbordService:DashbordService,
    private route: ActivatedRoute,
    private router: Router){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> |any{
    // return of(true);
    this.route.queryParams.subscribe((params) => {
      // console.log(params.s);
      if (route.paramMap.has('id')) {
        this.id = route.paramMap.get('id');
      }
    });


    return forkJoin([
      this.dashbordService.invoke_product_details(this.id),
      this.dashbordService.invoke_product_ratting(this.id),
    ]);
      // this.id = params['id'];
      // console.log(this.id);
      // return this.dashbordService.invoke_product_details(this.id);
      // this.postService.getposts(
      //   this.s,
      //   params.page,
      //   params.page_size,
      //   params.user
      // );
      // return new Promise((resolve, reject) => {
      //   //   this.dashbordService.invoke_products()
      //   //   .subscribe((products) => {
      //   //     resolve(products);
      //   //     console.log("printing from ------------"+products);
      //   //     return products;
      //   //   });


    
      //     this.dashbordService.invoke_product_details(this.id).subscribe(products=>{
            
      //       // console.log(products);
           
      //       // console.log(this.imageObject);
      //       resolve(products);
      //       return products;
            
      //     })
         
          
    
      //   });
      
   
    // return this.dashbordService.invoke_product_details(this.id);
    
  }
}

import { Product } from './dashbord.model';
import { AppService } from './../app.service';
import { DashbordService } from './dashbord.service';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  ActivatedRoute
} from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashbordResolver implements Resolve<boolean> {

  s:string = ' ';
  page:number =1;
  page_size = 20;



  constructor(
    private dashbordService:  DashbordService,
    private appService : AppService,
    private route: ActivatedRoute,
    private router: Router

    ){}




  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<Product>|any {
    // this.dashbordService.get_products();
    // this.dashbordService.invoke_products()

    this.route.queryParams.subscribe((params) => {
      if(params['cid']){
        console.log('ge------------------------t cid '+ (+params['cid']))
        this.dashbordService.get_filter_product(+params['cid']);

      }else{
        this.dashbordService.invoke_products(
          params['s'],
          params['page'],
          params['page_size']
        );
      }

    });

    // return of(true);

    return new Promise((resolve, reject) => {
    //   this.dashbordService.invoke_products()
    //   .subscribe((products) => {
    //     resolve(products);
    //     console.log("printing from ------------"+products);
    //     return products;
    //   });


      this.dashbordService.get_products().subscribe(products=>{
        resolve(products);
        console.log(products);
        return products;
      })

    });
  }
}

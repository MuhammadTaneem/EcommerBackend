import { DashbordService } from './../dashbord.service';
import { Product } from './../dashbord.model';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {


  productsSubscribe: any ;
  products:any;
  p:any;
  postSubcribe: any;
  length = 0;
  pageSize = 30;
  pageSizeOptions = [20, 30, 50, 100];
  currentPage = 1;
  hideCat= false;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dashbordService:DashbordService,
    ) { }

  ngOnInit(): void {
    this.loadData();
    this.isHideCat();
  }

  isHideCat(){
    this.route.queryParamMap.subscribe((paramMap: ParamMap) => {
      this.hideCat = false;
      console.log(paramMap.has('s'))

      if (paramMap.has('s')) {
        this.hideCat = true;
      }
      if (paramMap.has('cid')) {
        this.hideCat = true;
      }

    });

  }


  loadData(){
    this.productsSubscribe=
    this.postSubcribe = this.route.data.subscribe((data) => {
      this.products =  data['data'].product.results ;
      this.length = data['data'].product.count;
      console.log( data['data'].product.count );
      console.log(this.products)
      // console.log(data.data.viewposts, data.data.count);
    });

    this.postSubcribe = this.dashbordService.get_products().subscribe(products=>{

      this.p = products.product;
      this.products = this.p.results;
      this.length = this.p.count;
      console.log(this.p.count);
    })

  }

  onChangePage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.pageSize = pageData.pageSize;
    const queryParams = this.router.createUrlTree(['/'], {
      queryParams: { page: pageData.pageIndex + 1, page_size: this.pageSize },
      queryParamsHandling: 'merge',
      preserveFragment: true,
    });

    this.router.navigateByUrl(queryParams);

  }


  ngOnDestroy(): void {
    this.postSubcribe.unsubscribe();
  }


}

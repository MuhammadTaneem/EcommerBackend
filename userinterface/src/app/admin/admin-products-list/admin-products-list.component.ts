import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {ProfileService} from "../../auth/profile.service";
import {OrderService} from "../../order/order.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AdminService} from "../admin.service";
import {DashbordService} from "../../dashbord/dashbord.service";
import {PageEvent} from "@angular/material/paginator";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../../app.service";

@Component({
  selector: 'app-admin-products-list',
  templateUrl: './admin-products-list.component.html',
  styleUrls: ['./admin-products-list.component.scss']
})
export class AdminProductsListComponent implements OnInit {

  productsSubscribe: any;
  products: any;
  p: any;
  postSubcribe: any;
  length = 0;
  pageSize = 30;
  pageSizeOptions = [20, 30, 50, 100];
  currentPage = 1;
  screen_size = 0;
  cat_list:any;
  prductImage1:any;
  prductImage2:any;
  prductImage3:any;
  prductImage4:any;
  filename1:any;
  filename2:any;
  filename3:any;
  filename4:any;
  isPhotosChoosen = false;
  current_product_id!:number;



  ProductForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    weight: new FormControl('',),
    quantity: new FormControl('', [Validators.required]),
    color: new FormControl('',),
    brand: new FormControl('',),
    model: new FormControl('',),
    price: new FormControl('', [Validators.required]),
    size: new FormControl(''),
    product_category: new FormControl('', [Validators.required]),
    product_img1: new FormControl('', [Validators.required]),
    product_img2: new FormControl('',),
    product_img3: new FormControl('',),
    product_img4: new FormControl('',),
  });


  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private profileService: ProfileService,
    private orderService: OrderService,
    private modalService: NgbModal,
    private snacbar: MatSnackBar,
    private adminService: AdminService,
    private dashbordService: DashbordService,
    private appService:AppService,
  ) {
  }

  ngOnInit(): void {
    this.loadData();
    this.screen_size = screen.width;
    this.loadCategory();
  }

  ngOnChanges(changes: SimpleChanges){
    this.loadData();
  }

  loadProduct(){
    this.route.queryParams.subscribe((params) => {
      this.dashbordService.invoke_products(
        params['s'],
        params['page'],
        params['page_size']
      );
    });
    this.dashbordService.get_products().subscribe(products=>{
      console.log("get Products"+products);
      // return products;
    })
  }

  loadCategory(){
    this.appService.getnavitems().subscribe((navItems)=>{
      // this.categories.next(navItems);
      this.cat_list = navItems;
      console.log(this.cat_list);
      // return  this.get_categories();
    });
  }

  loadData() {
    this.productsSubscribe =
      this.postSubcribe = this.route.data.subscribe((data) => {
        console.log(data);
        this.products = data['data'].product.results;
        this.length = data['data'].product.count;
        // console.log(data.data.viewposts, data.data.count);
      });

    this.postSubcribe = this.dashbordService.get_products().subscribe(products => {
      this.p = products.product;
      this.products = this.p.results;
      this.length = this.p.count;
      console.log(this.p.count);
    })

  }

  onChangePage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.pageSize = pageData.pageSize;
    // this.postService.getPosts(this.pageSize, this.currentPage);
    const queryParams = this.router.createUrlTree(['/admin/'], {
      queryParams: {page: pageData.pageIndex + 1, page_size: this.pageSize},
      // queryParamsHandling: 'merge',
      // preserveFragment: true,
    });

    this.router.navigateByUrl(queryParams);

  }

  edit_product_Dialog(content: any, product:any)
  {
    console.log(content,  product)

    this.ProductForm.reset();
    this.current_product_id = product.id;
    this.ProductForm.controls['name'].setValue(product.name);
    this.ProductForm.controls['weight'].setValue(product.weight);
    this.ProductForm.controls['quantity'].setValue(product.quantity);
    this.ProductForm.controls['color'].setValue(product.color);
    this.ProductForm.controls['brand'].setValue(product.brand);
    this.ProductForm.controls['model'].setValue(product.model);
    this.ProductForm.controls['price'].setValue(product.price);
    this.ProductForm.controls['size'].setValue(product.size);
    this.ProductForm.controls['product_category'].setValue(product.product_category);
    this.ProductForm.controls['description'].setValue(product.description);
    this.prductImage1 = product.product_img1;
    this.prductImage2 = product.product_img2;
    this.prductImage3 = product.product_img3;
    this.prductImage4 = product.product_img4;
    this.ProductForm.controls['product_img1'].setValue(product.product_img1);
    this.ProductForm.controls['product_img2'].setValue(product.product_img2);
    this.ProductForm.controls['product_img3'].setValue(product.product_img3);
    this.ProductForm.controls['product_img4'].setValue(product.product_img4);
    this.ProductForm.markAsPristine();
    this.ProductForm.markAsUntouched();
    this.modalService.open(content, {
      size: 'xl',
      backdrop: 'static',
      keyboard: false,
    });
  }

  onChangePhoto1(file: any) {
    if (file[0]) {
      this.isPhotosChoosen = true;
      this.filename1 = file[0];
      const reader = new FileReader();
      reader.readAsDataURL(file[0]);
      reader.onload = (event) => {
        this.prductImage1 = reader.result;
      };
    }

    if (file[1]) {
      this.isPhotosChoosen = true;
      this.filename2 = file[1];
      const reader = new FileReader();
      reader.readAsDataURL(file[1]);
      reader.onload = (event) => {
        this.prductImage2 = reader.result;
      };
    }

    if (file[2]) {
      this.isPhotosChoosen = true;
      this.filename3 = file[2];
      const reader = new FileReader();
      reader.readAsDataURL(file[2]);
      reader.onload = (event) => {
        this.prductImage3 = reader.result;
      };
    }

    if (file[3]) {
      this.isPhotosChoosen = true;
      this.filename4 = file[3];
      const reader = new FileReader();
      reader.readAsDataURL(file[3]);
      reader.onload = (event) => {
        this.prductImage4 = reader.result;
      };
    }
  }

  onCancelPhoto1() {
    this.prductImage1 = this.prductImage2 = this.prductImage3 = this.prductImage4 ='';
    this.isPhotosChoosen = false;
  }

  on_update_product(model:any){

    let submit_data = {
      name: this.ProductForm.value['name'],
      description: this.ProductForm.value['description'],
      weight: this.ProductForm.value['weight'],
      quantity: this.ProductForm.value['quantity'],
      color: this.ProductForm.value['color'],
      brand: this.ProductForm.value['brand'],
      model: this.ProductForm.value['model'],
      price: this.ProductForm.value['price'],
      size: this.ProductForm.value['size'],
      author: 1,
      product_category: this.ProductForm.value['product_category'],
    }
    this.adminService.updateProduct(this.current_product_id,this.filename1, this.filename2, this.filename3, this.filename4, submit_data);
    model.dismiss('Cross click');

    // this.ProductForm.reset();
    // this.current_product_id = null;


  }
  delete_product_Dialog(content: any, product:any){
    this.current_product_id = product;
    this.modalService.open(content, {
      size: 'sm',
      backdrop: 'static',
      keyboard: false,
    });

  }
  deleteProduct(model:any){
    model.dismiss('Cross click')
    this.adminService.deleteProduct(this.current_product_id);
  }



  ngOnDestroy(): void {
    this.postSubcribe.unsubscribe();
  }


}

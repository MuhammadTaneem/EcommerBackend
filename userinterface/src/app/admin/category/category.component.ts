import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ProfileService} from "../../auth/profile.service";
import {OrderService} from "../../order/order.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AdminService} from "../admin.service";
import {DashbordService} from "../../dashbord/dashbord.service";
import {AppService} from "../../app.service";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  cat_list:any;
  current_product_id !:number;
  current_cetegory:any;
  isPhotosChoosen = false;
  filename1:any;
  prductImage1:any;

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
    this.loadCategory();
  }

  loadData(id:number){
    // this.dashbordService.get_filter_product(id);
    this.router.navigate(['dashbord/products/'],{ queryParams: { cid: id } });
  }

  loadCategory(){
    this.appService.getnavitems().subscribe((navItems)=>{
      // this.categories.next(navItems);
      this.cat_list = navItems;
      console.log(this.cat_list);
      // return  this.get_categories();
    });
  }

  // edit category
  add_category_Dialog(content: any){
    this.modalService.open(content, {
      size: 'sm',
      backdrop: 'static',
      keyboard: false,
    });

  }
  add_Cetegory(name:string,model:any){
    model.dismiss('Cross click')
    this.adminService.add_category(name,this.filename1);
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
  }

  onCancelPhoto1() {
    this.prductImage1=this.current_cetegory.cat_img;
    this.isPhotosChoosen = false;
  }

  onCancelPhotoadd() {
    this.prductImage1='';
    this.isPhotosChoosen = false;
  }

// edit category
  edit_category_Dialog(content: any, category:any){
    this.current_product_id = category.id;
    // this.isPhotosChoosen = true;
    this.prductImage1 =category.cat_img;
    this.current_cetegory= category;
    this.modalService.open(content, {
      size: 'md',
      backdrop: 'static',
      keyboard: false,
    });
  }
  edit_Cetegory(name:string,model:any){
    this.current_cetegory.name = name;
    model.dismiss('Cross click')
    this.adminService.edit_category(this.current_cetegory,this.filename1);
  }

// delte categgory
  delete_category_Dialog(content: any, category:any){
    this.current_product_id = category;
    this.modalService.open(content, {
      size: 'sm',
      backdrop: 'static',
      keyboard: false,
    });

  }
  deleteCetegory(model:any){
    model.dismiss('Cross click')
    this.adminService.delete_category(this.current_product_id);
  }

}

import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from "../../auth/auth.service";
import {DashbordService} from "../../dashbord/dashbord.service";
import {AppService} from "../../app.service";
import {AdminService} from "../admin.service";

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {

  cat_list: any;
  photo1Url: any;
  photo2Url: any;
  photo3Url: any;
  photo4Url: any;
  isPhotosChoosen = false;


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
    private dashBordService: DashbordService,
    private appService: AppService,
    private adminService: AdminService,
  ) {
  }

  ngOnInit(): void {
    this.loadCategory();
  }

  loadCategory() {
    this.appService.getnavitems().subscribe(data => {
      this.cat_list = data;
      console.log(this.cat_list);

    })
  }

  filename1: any;
  filename2: any;
  filename3: any;
  filename4: any;

  // change or choose photos
  onChangePhoto1(file: any) {
    if (file[0]) {
      this.isPhotosChoosen = true;
      this.filename1 = file[0];
      const reader = new FileReader();
      reader.readAsDataURL(file[0]);
      reader.onload = (event) => {
        this.photo1Url = reader.result;
      };
    }

    if (file[1]) {
      this.isPhotosChoosen = true;
      this.filename2 = file[1];
      const reader = new FileReader();
      reader.readAsDataURL(file[1]);
      reader.onload = (event) => {
        this.photo2Url = reader.result;
      };
    }

    if (file[2]) {
      this.isPhotosChoosen = true;
      this.filename3 = file[2];
      const reader = new FileReader();
      reader.readAsDataURL(file[2]);
      reader.onload = (event) => {
        this.photo3Url = reader.result;
      };
    }

    if (file[3]) {
      this.isPhotosChoosen = true;
      this.filename4 = file[3];
      const reader = new FileReader();
      reader.readAsDataURL(file[3]);
      reader.onload = (event) => {
        this.photo4Url = reader.result;
      };
    }
  }

  onCancelPhoto1() {
    this.photo1Url = this.photo2Url = this.photo3Url = this.photo4Url ='';
    this.isPhotosChoosen = false;
  }

  onSubmit() {
    console.log(this.ProductForm);
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
      // product_img1: this.filename,
      // product_img1: JSON.parse(this.ProductForm.value['product_img1']),
      // product_img2: JSON.parse(this.ProductForm.value['product_img2']),
      // product_img3: JSON.parse(this.ProductForm.value['product_img3']),
      // product_img4: JSON.parse(this.ProductForm.value['product_img4']),
    }
    console.log(submit_data);
    // this.adminService.upload_product(submit_data);
    this.adminService.upload_product(this.filename1, this.filename2, this.filename3, this.filename4, submit_data);
    this.ProductForm.reset();
    this.onCancelPhoto1();
  }

}

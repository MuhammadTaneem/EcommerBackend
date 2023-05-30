import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ProfileService} from "../auth/profile.service";
import {OrderService} from "../order/order.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AdminService} from "./admin.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  orders: any;
  user:any;
  haveAccess:boolean = false;




  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private profileService: ProfileService,
    private orderService: OrderService,
    private modalService: NgbModal,
    private snacbar: MatSnackBar,
    private adminService: AdminService
  ) {
  }

  ngOnInit(): void {
    this.loadUser()
    this.loadMyOrder()
  }


  loadUser(){
    let pid = Number(localStorage.getItem('uid'));
    this.profileService.getProfile(pid).subscribe((data)=>{
      this.user = data;
      if(this.user[0].is_staff || this.user[0].is_superuser){
        this.haveAccess = true;
      }
    })
  }

  loadMyOrder() {
    let all='all'
    this.orderService.getMyOrder(all).subscribe(data => {
        console.log(data);
        this.orders = data;
      },
      error => {
        console.log(error)
      })
  }

  onChangeOrder(newStatus: any, order: any) {
    console.log(newStatus, order);
    order.status = newStatus;
    this.adminService.chnageOrderStatus(order, order.id);
  }


}

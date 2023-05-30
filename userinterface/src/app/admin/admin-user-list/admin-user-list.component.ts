import {Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ProfileService} from "../../auth/profile.service";
import {OrderService} from "../../order/order.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AdminService} from "../admin.service";



@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.scss']
})
export class AdminUserListComponent implements OnInit {
  length: number = 0;


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
    this.loadAllUser();
  }


  displayedColumns: string[] = ['id', 'first_name', 'email', 'is_staff', 'is_superuser', 'phone'];
  dataSource: any;

  loadAllUser() {
    this.adminService.get_all_user().subscribe(data => {
      this.dataSource = data;
      this.length = this.dataSource.length;

      console.log(this.dataSource.length);
    })
  }

  onToggle(is: boolean, filed: string, element: any) {

    let submit_data = {
      'is_staff': element.is_staff,
      'is_superuser': element.is_superuser
    }
    if (filed == 'staff') {
      submit_data.is_staff = is;
    }
    if (filed == 'super') {
      submit_data.is_superuser = is;
    }
    console.log(is, filed, submit_data);
    this.profileService.updateUser(element.id, submit_data)
      .subscribe((postData) => {
          this.snacbar.open('Updated  ', 'X', {duration: 2000});
        },
        (error) => {
          let err = JSON.stringify(error.error);
          err = err.split(':')[1];
          err = err.slice(1, -2);
          this.snacbar.open(err, 'X');
        });
  }


  // @ViewChild(MatPaginator)paginator!: MatPaginator;

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }

}

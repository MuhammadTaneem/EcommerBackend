import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.scss']
})
export class ActivationComponent implements OnInit {

  uid: any;
  token: any;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    console.log("url confirm");
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('uid') && paramMap.has('token')) {
        this.uid = paramMap.get('uid');
        this.token = paramMap.get('token');
        this.authService.userActivation(this.uid, this.token);
      }
    });
  }

}

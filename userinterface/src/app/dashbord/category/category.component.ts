import { AppService } from './../../app.service';
import { Component, OnInit } from '@angular/core';
import { Category } from '../dashbord.model';
import {DashbordService} from "../dashbord.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  // navlist =["Women's Fashion","men's Fashion", 'Health & Beauty','Electronic Devices','Home Appliances','Sports & Outdoor',"men's Fashion", 'Health & Beauty','Electronic Devices','Home Appliances','Sports & Outdoor'];
  navItems :Category | any= [] ;
  constructor(private appService:AppService, private  router:Router) { }


  ngOnInit(): void {

    // this.navItems =this.appService.getnavitems();
  this.appService.getnavitems().subscribe((navItems)=>{
          // this.categories.next(navItems);
          this.navItems = navItems;
          // return  this.get_categories();
        });

    // this.getNavs();



  }

  loadData(id:number){
    this.router.navigate(['dashbord/products/'],{ queryParams: { cid: id } });
    // this.dashbordService.get_filter_product(id);
  }


}

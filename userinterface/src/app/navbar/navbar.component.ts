import { Category } from './../dashbord/dashbord.model';
import { AppService } from './../app.service';
import { Component, OnInit } from '@angular/core';
import { faCoffee, faUser,faCartShopping , faMagnifyingGlass, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import {AuthService} from "../auth/auth.service";
import {FormControl, FormGroup} from "@angular/forms";
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {



  faCoffee = faCoffee;
  faUser =faUser;
  cart = faCartShopping;
  searchIcon = faMagnifyingGlass;
  faLogount = faRightFromBracket;
  minisearch = 'none';
  authStatus:boolean = false;
  navItems :Category | any= [] ;
  searchForm = new FormGroup({
    search: new FormControl(''),
  });



  constructor(
    private route: ActivatedRoute,
    private appService:AppService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {

    // this.navItems =this.appService.getnavitems();

    this.loggedIN();

  this.appService.getnavitems().subscribe((navItems)=>
    {
            // this.categories.next(navItems);
            this.navItems = navItems;
            console.log(navItems);
            // return  this.get_categories();
    });

  }

  loggedIN(){
      this.authService.haveTokenLisenter().subscribe(data=>{
        this.authStatus  = data;
      })
  }

  searchopen(){
    if (this.minisearch === "none") {
      this.minisearch = "block";
    } else {
      this.minisearch = "none";
    }
  }

  onSearch(s:string){

    // let ss =  this.searchForm.value['search']|| '';
    this.router.navigate(['dashbord/products/'],{queryParams:{s:s}})
      // Pass along the hero id if available
      // so that the HeroList component can select that item.
      // this.router.navigate(['/', { fragment: 'dashbord/products/' },{ '?s': s }]);
      // this.router.navigateByUrl("#/dashborad");
    // this.router.navigate([''], { fragment: '',skipLocationChange: true});
  }

  loadData(id:number){
    this.router.navigate(['dashbord/products/'],{ queryParams: { cid: id } });
    // this.dashbordService.get_filter_product(id);
  }


  logOUt(){
    this.authService.logOut();
  }

}

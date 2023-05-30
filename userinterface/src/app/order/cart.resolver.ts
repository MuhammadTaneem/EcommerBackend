import { ProfileService } from './../auth/profile.service';
import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartResolver implements Resolve<boolean> {
  constructor( 
    private authService:AuthService,
    private profileService:ProfileService,
    ){}
  resolve(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): Observable<any>|any {
    return this.profileService.getCarts();
  }
}


// id: any;
// post: any = [];



// resolve(
//   route: ActivatedRouteSnapshot,
//   state: RouterStateSnapshot
// ): Observable<any> | any {
//   // if (route.paramMap.has('id')) {
//   //   this.id = route.paramMap.get('id');
//   //   // this.profileService.getProfile(this.id);
//   //   // console.log(route.paramMap.get('id'));
//   // }
//   this.id = this.authService.getId();
  

//   // const user = this.profileService.getProfile(this.id);
//   // console.log(user);
//   this.profileService.getProfile(this.id).subscribe(d=>{
//     console.log(this.id)
//     console.log(d)
//   });

//   return this.profileService.getProfile(this.id);

//   // return this.profileService.receiveProfile();
// }
// }

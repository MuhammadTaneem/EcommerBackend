import { AuthService } from './auth.service';
import { ProfileService } from './profile.service';
import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileResolver implements Resolve<boolean> {
  id: any;
  post: any = [];

  constructor(
    private profileService: ProfileService,
    private authService:AuthService,
    ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | any {
    this.id = this.authService.getId();
    this.profileService.getProfile(this.id).subscribe(d=>{
      console.log(this.id)
      console.log(d)
    });

    return this.profileService.getProfile(this.id);
  }
}

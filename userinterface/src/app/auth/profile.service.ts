import {AuthService} from './auth.service';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  BACKEND_URL = environment.apiUrl + 'api/';

  constructor(
    private http: HttpClient,
    private snacbar: MatSnackBar,
    private router: Router,
    private authService: AuthService
  ) {
  }

  getProfile(pid: number) {
    console.log(pid);
    return this.http.get<{ user: any }>(this.BACKEND_URL + 'profile/' + `?uid=${pid}`);
  }

  getCarts() {
    return this.http.get<{}>(this.BACKEND_URL + 'cart/');
  }

  updateUser(uid: string, obj: any) {
    console.log(uid);
    const access = this.authService.getToken();
    console.log(this.authService.getToken());
    const headers = new HttpHeaders().set('Authorization', `jwt ${access}`);

    return this.http
      .patch<{ id: string }>(this.BACKEND_URL + 'profile/' + uid + `/?uid=${uid}`, obj);
  }
}

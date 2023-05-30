import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {ConfirmPasswordComponent} from './confirm-password/confirm-password.component';
import {ForgetPasswordComponent} from './forget-password/forget-password.component';
import {RegistrationComponent} from './registration/registration.component';
import {LoginComponent} from './login/login.component';
import {AuthRoutingModule} from './auth-routing.module';
import {AccountComponent} from './account/account.component';
import {CoreuiModule} from '../coreui/coreui.module';
import {AuthService} from './auth.service';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {ActivationComponent} from './activation/activation.component';
import {MatIconModule} from "@angular/material/icon";
import {EditAccountComponent} from './account/edit-account/edit-account.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    ChangePasswordComponent,
    ConfirmPasswordComponent,
    ForgetPasswordComponent,
    RegistrationComponent,
    LoginComponent,
    AccountComponent,
    ActivationComponent,
    EditAccountComponent,

  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    CoreuiModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatIconModule,
    FormsModule,
  ],
  exports: [
    CommonModule,
    AuthRoutingModule,
    // MatSnackBarModule,


  ],
  providers: [
    // DashbordService,
    AuthService,
  ]
})
export class AuthModule {
}

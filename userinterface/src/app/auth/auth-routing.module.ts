import {ProfileResolver} from './profile.resolver';
import {AuthGuard} from './auth.guard';
import {AccountComponent} from './account/account.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {ForgetPasswordComponent} from './forget-password/forget-password.component';
import {ConfirmPasswordComponent} from './confirm-password/confirm-password.component';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {ActivationComponent} from "./activation/activation.component";


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'activate/:uid/:token',
    component: ActivationComponent,
  },
  {
    path: 'registration',
    component: RegistrationComponent,
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'password/reset/confirm/:uid/:token',
    component: ConfirmPasswordComponent,
  },
  {
    path: 'forget-password',
    component: ForgetPasswordComponent,
  },
  {
    path: 'account',
    runGuardsAndResolvers: "always",
    component: AccountComponent,
    canActivate: [AuthGuard],
    resolve: {
      data: ProfileResolver,
    },
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}

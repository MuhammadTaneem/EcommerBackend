import {NavbarComponent} from './navbar/navbar.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

// import { DefaultLayoutComponent } from './containers';
// import { Page404Component } from './views/pages/page404/page404.component';
// import { Page500Component } from './views/pages/page500/page500.component';
// import { LoginComponent } from './views/pages/login/login.component';
// import { RegisterComponent } from './views/pages/register/register.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashbord',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then((m) => m.AuthModule),
    // outlet: 'main'

  },
  {
    path: 'dashbord',
    loadChildren: () =>
      import('./dashbord/dashbord.module').then((m) => m.DashbordModule),
    // outlet: 'main'

  },
  {
    path: 'order',
    loadChildren: () =>
      import('./order/order.module').then((m) => m.OrderModule),
    // outlet: 'main',

  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
    // outlet: 'main',

  },
  {
    path: 'navbar',
    component: NavbarComponent,
    outlet: 'navbar'
    // resolve: {
    //   data: AppResolver,
    // },
  },


  {path: '**', redirectTo: 'dashboard'}
];

// @NgModule({
//   imports: [
//     RouterModule.forRoot(routes, {
//       scrollPositionRestoration: 'top',
//       anchorScrolling: 'enabled',
//       initialNavigation: 'enabledBlocking'
//       // relativeLinkResolution: 'legacy'
//     })
//   ],
//   exports: [RouterModule]
// })


@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload',
    scrollPositionRestoration: 'top',
    anchorScrolling: 'enabled',
    initialNavigation: 'enabledBlocking'
  })],
  exports: [RouterModule]
})


export class AppRoutingModule {
}

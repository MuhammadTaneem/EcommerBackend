import {CartResolver} from './cart.resolver';
import {CartComponent} from './cart/cart.component';

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../auth/auth.guard';
import {OrderComponent} from "./order/order.component";
import {SingleOrderComponent} from "./single-order/single-order.component";

const routes: Routes = [
  {
    path: '',
    component: OrderComponent,
    canActivate: [AuthGuard],
    resolve: {
      data: CartResolver,
    },
  },
  {
    path: 'single/:product',
    component: SingleOrderComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'cart',
    runGuardsAndResolvers: "always",
    component: CartComponent,
    canActivate: [AuthGuard],
    resolve: {
      data: CartResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule {
}

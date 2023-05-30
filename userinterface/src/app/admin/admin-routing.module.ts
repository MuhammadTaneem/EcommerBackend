import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "../auth/auth.guard";
import {AdminComponent} from "./admin.component";
import {AdminResolver} from "./admin.resolver";
import {AdminProductsListComponent} from "./admin-products-list/admin-products-list.component";
import {DashbordResolver} from "../dashbord/dashbord.resolver";

const routes: Routes = [

  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    resolve: {
      data: DashbordResolver,
    },
  },
  {
    path: 'products',
    runGuardsAndResolvers: "always",
    component: AdminProductsListComponent,
    // resolve: {
    //   data: DashbordResolver
    // }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}

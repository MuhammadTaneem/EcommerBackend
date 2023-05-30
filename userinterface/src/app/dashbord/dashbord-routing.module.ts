import { PdetailsResolver } from './pdetails.resolver';
import { DashbordResolver } from './dashbord.resolver';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsComponent } from './products/products.component';
import { CategoryComponent } from './category/category.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full'
  },
  {
    path: 'category',
    component: CategoryComponent
  },
  {
    path: 'products',
    component: ProductsComponent,
    resolve: {
      data: DashbordResolver,
    },
  },
  {
    path: 'productdetails/:id',
    component: ProductDetailsComponent,
    resolve: {
      data: PdetailsResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashbordRoutingModule { }

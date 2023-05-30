import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {AdminComponent} from './admin.component';
import {ProductAddComponent} from './product-add/product-add.component';
import {CoreuiModule} from "../coreui/coreui.module";
import {NgImageSliderModule} from "ng-image-slider";
import {FontasModule} from "../fontawsome/fontawsome.module";
import {NgxStarRatingModule} from "ngx-star-rating";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {MatPaginatorModule} from "@angular/material/paginator";
import {AdminService} from "./admin.service";
import {AdminResolver} from "./admin.resolver";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatIconModule} from "@angular/material/icon";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatStepperModule} from "@angular/material/stepper";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatRippleModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {AdminProductsListComponent} from './admin-products-list/admin-products-list.component';
import {AdminUserListComponent} from './admin-user-list/admin-user-list.component';
import {MatTableModule} from '@angular/material/table'
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { CategoryComponent } from './category/category.component';



@NgModule({
  declarations: [
    AdminComponent,
    ProductAddComponent,
    AdminProductsListComponent,
    AdminUserListComponent,
    CategoryComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    CoreuiModule,
    NgImageSliderModule,
    FontasModule,
    NgxStarRatingModule,
    NgbModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatIconModule,
    FormsModule,
    FontAwesomeModule,
    MatStepperModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatSelectModule,
    MatTableModule,
    MatSlideToggleModule,
  ],
  exports: [
    CommonModule,
    AdminRoutingModule,
  ],
  providers: [
    AdminService,
    AdminResolver,
  ]
})
export class AdminModule {
}

import {CoreuiModule} from './../coreui/coreui.module';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OrderRoutingModule} from './order-routing.module';
import {CartComponent} from './cart/cart.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {OrderComponent} from './order/order.component';
import {MatStepperModule} from '@angular/material/stepper';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatRippleModule} from "@angular/material/core";
import {MatSelectModule} from '@angular/material/select';
import { SingleOrderComponent } from './single-order/single-order.component';

@NgModule({
  declarations: [
    CartComponent,
    OrderComponent,
    SingleOrderComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    CoreuiModule,
    FontAwesomeModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatSelectModule
  ]
})
export class OrderModule {
}

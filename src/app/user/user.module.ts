import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ProductComponent } from './pages/product/product.component';
import { CartComponent } from './pages/cart/cart.component';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule



@NgModule({
  declarations: [
    ProductComponent,
    CartComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule // Ensure ReactiveFormsModule is imported

  ]
})
export class UserModule { }

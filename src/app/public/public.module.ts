import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';

@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'cart', component: CartComponent }
    ])
  ],
  exports: [
    CartComponent
  ]
})
export class PublicModule { }

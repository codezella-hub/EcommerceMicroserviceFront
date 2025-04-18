import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductCategoriesRoutingModule } from './product-categories-routing.module';
import { ProductCategoriesComponent } from './product-categories.component';
import {CreateProductComponent} from "./Pages/productCreatePage/create-product.component";
import {ProductComponent} from "./Pages/productListPage/product.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ProductCategoriesComponent,
    ProductComponent,
    CreateProductComponent
  ],
  imports: [
    CommonModule,
    ProductCategoriesRoutingModule,
    FormsModule ,
    ReactiveFormsModule
  ]
})
export class ProductCategoriesModule { }

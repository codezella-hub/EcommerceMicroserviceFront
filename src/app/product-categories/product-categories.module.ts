import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductCategoriesRoutingModule } from './product-categories-routing.module';
import { ProductCategoriesComponent } from './product-categories.component';
import {CreateProductComponent} from "./Pages/productCreatePage/create-product.component";
import {ProductComponent} from "./Pages/productListPage/product.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SinglePageProductComponent } from './Pages/singlePageProduct/single-page-product.component';
import { UpdatePageProductComponent } from './Pages/updatePageProduct/update-page-product.component';
import { ListPageProductAdminComponent } from './Pages/listPageProductAdmin/list-page-product-admin.component';
import { CategorisListPageAdminComponent } from './Pages/CategorisListPageAdmin/categoris-list-page-admin.component';
import { CategoriesUpdatePageComponent } from './Pages/categoriesUpdatePage/categories-update-page.component';
import { CategoriesCreatePageComponent } from './Pages/categoriesCreatePage/categories-create-page.component';


@NgModule({
  declarations: [
    ProductCategoriesComponent,
    ProductComponent,
    CreateProductComponent,
    SinglePageProductComponent,
    UpdatePageProductComponent,
    ListPageProductAdminComponent,
    CategorisListPageAdminComponent,
    CategoriesUpdatePageComponent,
    CategoriesCreatePageComponent
  ],
  imports: [
    CommonModule,
    ProductCategoriesRoutingModule,
    FormsModule ,
    ReactiveFormsModule
  ]
})
export class ProductCategoriesModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductCategoriesComponent } from './product-categories.component';
import {ProductComponent} from "./Pages/productListPage/product.component";
import {CreateProductComponent} from "./Pages/productCreatePage/create-product.component";
import {SinglePageProductComponent} from "./Pages/singlePageProduct/single-page-product.component";
import {ListPageProductAdminComponent} from "./Pages/listPageProductAdmin/list-page-product-admin.component";
import {UpdatePageProductComponent} from "./Pages/updatePageProduct/update-page-product.component";

const routes: Routes = [{ path: '', component: ProductCategoriesComponent },
  {path:'products', component: ProductComponent},
  {path:'create-product', component:CreateProductComponent},
  {path:'update-product/:id', component:UpdatePageProductComponent},
  {path:'single-product/:id', component:SinglePageProductComponent},
  {path:'list-product-admin', component:ListPageProductAdminComponent},



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductCategoriesRoutingModule { }

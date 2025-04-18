import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductCategoriesComponent } from './product-categories.component';
import {ProductComponent} from "./Pages/productListPage/product.component";
import {CreateProductComponent} from "./Pages/productCreatePage/create-product.component";

const routes: Routes = [{ path: '', component: ProductCategoriesComponent },
  {path:'products', component: ProductComponent},
  {path:'create-product', component:CreateProductComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductCategoriesRoutingModule { }

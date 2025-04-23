import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductComponent } from '../product-categories/Pages/productListPage/product.component';
import { ReclamationComponent } from './pages/reclamation/reclamation.component';


const routes: Routes = [
  {
    path: "reclamations",
    component: ReclamationComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
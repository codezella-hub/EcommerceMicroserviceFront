import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { ReclamationComponent } from './pages/reclamation/reclamation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductComponent } from '../product-categories/Pages/productListPage/product.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ProductComponent,
    ReclamationComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }

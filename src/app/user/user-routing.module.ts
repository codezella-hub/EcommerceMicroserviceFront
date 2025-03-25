import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './pages/cart/cart.component';
import { ReclamationComponent } from '../user/pages/reclamation/reclamation.component';

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
export class UserRoutingModule { }
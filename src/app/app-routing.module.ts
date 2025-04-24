import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './commun/home/home.component';

import { LoginComponent } from './public/components/login/login.component';
import { RegisterComponent } from './public/components/register/register.component';
import { PageNotFoundComponent } from './commun/page-not-found/page-not-found.component';
import { ReclamationComponent } from './admin/pages/reclamation/reclamation.component';
import { ChatbotComponent } from './public/components/chat-bot/chat-bot.component';

import { CartComponent } from './public/components/cart/cart.component';
import { SuccessComponent } from './public/components/success/success.component';
import { CancelComponent } from './public/components/cancel/cancel.component';

import { ProductComponent } from './product-categories/Pages/productListPage/product.component';
import { CreateProductComponent } from './product-categories/Pages/productCreatePage/create-product.component';
import { OrdersComponent } from './public/components/orders/orders.component';
import {ProfileShowComponent} from "./profile-show/profile-show.component";


const routes: Routes = [
  { path: "" , component: HomeComponent},

  { path: "login", component: LoginComponent },
  { path: "show-profile", component: ProfileShowComponent },
  { path: "register", component: RegisterComponent },
  { path: "cart", component: CartComponent },
  {path:"orders",component:OrdersComponent},
  { path: "success", component: SuccessComponent },
  { path: "cancel", component: CancelComponent },
  { path: "chatbot", component: ChatbotComponent },
  // { path: "reclamations", component: ReclamationComponent }, // Uncomment if needed
  { path: "admin", loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: "user", loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
  { path: "product-categories", loadChildren: () => import('./product-categories/product-categories.module').then(m => m.ProductCategoriesModule) },
  { path: "**", component: PageNotFoundComponent }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

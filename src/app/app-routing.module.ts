import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './commun/home/home.component';

import { LoginComponent } from './public/components/login/login.component';
import { RegisterComponent } from './public/components/register/register.component';
import { PageNotFoundComponent } from './commun/page-not-found/page-not-found.component';
import { ReclamationComponent } from './admin/pages/reclamation/reclamation.component';

const routes: Routes = [
  { path: "" , component: HomeComponent},
  {path:"login", component : LoginComponent},
  {path:'register',component:RegisterComponent},
  //a{path:'reclamations',component:ReclamationComponent},
  {path:'admin',loadChildren:()=>import('./admin/admin.module').then(m=>m.AdminModule) },
  {path:'user', loadChildren:()=>import('./user/user.module').then(m=>m.UserModule)},
  {path:'**',component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

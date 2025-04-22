import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './public/components/login/login.component';
import { RegisterComponent } from './public/components/register/register.component';
import { HeaderComponent } from './commun/header/header.component';
import { FooterComponent } from './commun/footer/footer.component';
import { HomeComponent } from './commun/home/home.component';
import { PageNotFoundComponent } from './commun/page-not-found/page-not-found.component';

import { PublicModule } from './public/public.module';
import { SuccessComponent } from './public/components/success/success.component';
import { CancelComponent } from './public/components/cancel/cancel.component';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    PageNotFoundComponent,
    SuccessComponent,
    CancelComponent
  ],
  imports: [
    BrowserModule,
    PublicModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule, // Add ReactiveFormsModule here

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

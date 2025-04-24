import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClient, HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './public/components/login/login.component';
import { RegisterComponent } from './public/components/register/register.component';
import { HeaderComponent } from './commun/header/header.component';
import { FooterComponent } from './commun/footer/footer.component';
import { HomeComponent } from './commun/home/home.component';
import { PageNotFoundComponent } from './commun/page-not-found/page-not-found.component';
import { ChatbotComponent } from './public/components/chat-bot/chat-bot.component';
import { SuccessComponent } from './public/components/success/success.component';
import { CancelComponent } from './public/components/cancel/cancel.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PublicModule } from './public/public.module';
import {KeycloakService} from "./services/keycloak/keycloak.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileShowComponent } from './profile-show/profile-show.component';
import { ProfileUpdateComponent } from './profile-update/profile-update.component';
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSelectModule} from "@angular/material/select";
import {MatNativeDateModule} from "@angular/material/core";
export  function kcFactory(kcService:KeycloakService){
  return () => kcService.init();
}

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
    CancelComponent,
    ChatbotComponent,
    ProfileShowComponent,
    ProfileUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PublicModule,
    BrowserAnimationsModule,
    MatButtonModule,

    MatDialogModule,

    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule

  ],
  providers: [
    HttpClient,
    {
      provide: APP_INITIALIZER,
      deps: [KeycloakService],
      useFactory: kcFactory,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

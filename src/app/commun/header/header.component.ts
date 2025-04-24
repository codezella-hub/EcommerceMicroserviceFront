import {Component, OnInit} from '@angular/core';
import {KeycloakService} from "../../services/keycloak/keycloak.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  username!:string;
  constructor(
    private keycloakService: KeycloakService,

  ) {
  }


  isUserAuthenticated(): boolean {
    return this.isAuthenticated() && this.keycloakService.hasRole('user');
  }

  isAdminAuthenticated(): boolean {
    return this.isAuthenticated() && this.keycloakService.hasRole('admin');
  }

  isAuthenticated(): boolean {
    return this.keycloakService.isAuthenticated();
  }
  goToProfile() {
    throw new Error('Method not implemented.');
  }
  logout() {
    this.keycloakService.logout();
  }
  onLogin(){
    this.keycloakService.login();
  }
  goToAccountManagement() {
    this.keycloakService.goToAccountManagement();
  }

  ngOnInit(): void {
    this.username= `${this.keycloakService.profile?.username}`
  }

}

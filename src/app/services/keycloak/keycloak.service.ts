import { Injectable } from '@angular/core';
import Keycloak from "keycloak-js";
import {UserProfile} from "../../model/user-profile";

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {
 private  _keycloak : Keycloak | undefined;
  private _profile: UserProfile | undefined;
  get profile(): UserProfile | undefined {
    return this._profile;
  }
  constructor() { }
  get keycloak() {
    if (!this._keycloak) {
      this._keycloak = new Keycloak({
        url: 'http://localhost:8081',
        realm: 'microservice',
        clientId: 'api-gateway'
      });
    }
    return this._keycloak;
  }
  async init(){
    const authenticated = await this.keycloak.init({
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
    });

    if (authenticated) {
      this._profile = (await this.keycloak.loadUserProfile()) as UserProfile;
      this._profile.token = this.keycloak.token || '';
      this._profile.id = this.keycloak.tokenParsed?.sub || '';
    }

  }
  login() {
    return this.keycloak.login();
  }
  hasRole(role: string): boolean {
    return this.keycloak.tokenParsed?.realm_access?.roles.includes(role) || false;
  }

  isAuthenticated(): boolean {
    return this.keycloak.authenticated || false;
  }

  logout() {
    // this.keycloak.accountManagement();
    return this.keycloak.logout({redirectUri: 'http://localhost:4200'});
  }
  goToAccountManagement() {
    this.keycloak.accountManagement();
  }

}

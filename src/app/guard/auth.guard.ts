import {CanActivateFn, Router} from '@angular/router';
import {KeycloakService} from '../services/keycloak/keycloak.service';
import {inject} from '@angular/core';
export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(KeycloakService);
  const router = inject(Router);
  if (tokenService.keycloak.isTokenExpired()) {
    router.navigate(['/']);
    return false;
  }
  return true;
};

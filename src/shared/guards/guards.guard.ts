import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../api/auth/auth.service';

export const canActivateAuth: CanActivateFn = () => {
  const isUserLoggedIn = inject(AuthService).isAuth;

  if (isUserLoggedIn) return true;

  return inject(Router).createUrlTree(['/login']);
};

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '@core/auth/store/auth.store';

export const redirectAuthGuard: CanActivateFn = () => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  return authStore.user() ? router.createUrlTree(['/babies']) : true;
};

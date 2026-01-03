import { inject } from '@angular/core';
import { AuthStore } from '@core/auth/store/auth.store';

export const authInitializer = () => {
  const authStore = inject(AuthStore);
  return authStore.onInit();
};

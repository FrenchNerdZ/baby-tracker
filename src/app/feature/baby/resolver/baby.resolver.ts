import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { Baby } from '@baby/model/baby.model';
import { BabyStore } from '@baby/store/baby.store';
import { AuthStore } from '@core/auth/store/auth.store';

export const babiesResolver: ResolveFn<Array<Baby>> = async () => {
  const babyStore = inject(BabyStore);
  const authStore = inject(AuthStore);
  const router = inject(Router);

  const user = authStore.user();
  if (user) {
    const babies = await babyStore.loadBabies(user.id);

    if (babies.length === 1) {
      await router.navigate([`/babies`, babies[0].id]);
    }

    return babies;
  } else {
    await router.navigate(['/sign-in']);
  }
  return [];
};

export const babyResolver: ResolveFn<Baby | undefined> = async (route) => {
  const babyId = route.paramMap.get('babyId');
  if (!babyId) throw new Error('babyId not found');

  const baby = await inject(BabyStore).loadBaby(babyId);

  if (!baby) {
    await inject(Router).navigate(['/empty']);
  }
  return baby;
};

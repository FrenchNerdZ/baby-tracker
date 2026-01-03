import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { BabyStore } from '@baby/store/baby.store';
import { DayService } from '@day/service/day.service';
import { Day } from '../type/daily.type';

export const daysResolver: ResolveFn<Array<Day>> = async () => {
  const dayService = inject(DayService);
  const babyStore = inject(BabyStore);
  const router = inject(Router);

  const baby = babyStore.selectedBaby();
  if (baby) {
    return await dayService.getDaysByBaby(baby.id);
  } else {
    await router.navigate(['/babies']);
  }
  return [];
};

export const dayResolver: ResolveFn<Day | undefined> = async (route) => {
  const date = route.paramMap.get('date');
  if (!date) throw new Error('date not found');

  return {} as Day;
};

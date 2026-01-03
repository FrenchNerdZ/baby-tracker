import { inject } from '@angular/core';
import { Baby } from '@baby/model/baby.model';
import { BabyService } from '@baby/service/baby.service';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

interface BabyState {
  babies: Array<Baby>;
  selectedBaby: Baby | undefined;
  loading: boolean;
  error: string | undefined;
}

const initialState: BabyState = {
  babies: [],
  selectedBaby: undefined,
  loading: false,
  error: undefined,
};

export const BabyStore = signalStore(
  { providedIn: 'root' },
  withState<BabyState>(initialState),
  withMethods((store, babyService = inject(BabyService)) => ({
    async loadBabies(userId: string) {
      patchState(store, { loading: true });

      try {
        const babies = await babyService.getBabiesByUser(userId);
        patchState(store, {
          babies,
          loading: false,
        });

        return babies;
      } catch {
        patchState(store, { loading: false, error: `Error getting babies` });
      }
      return [];
    },
    async loadBaby(babyId: string) {
      patchState(store, { loading: true });

      try {
        const baby = await babyService.getBabyById(babyId);
        patchState(store, {
          selectedBaby: baby,
          loading: false,
        });

        return baby;
      } catch {
        patchState(store, { loading: false, error: `Error getting baby` });
      }
      return undefined;
    },

    clear() {
      patchState(store, initialState);
    },
  })),
);

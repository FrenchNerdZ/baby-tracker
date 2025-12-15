import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

interface UpdateState {
  available: boolean;
}

export const UpdateStore = signalStore(
  { providedIn: 'root' },
  withState<UpdateState>({
    available: false,
  }),
  withMethods((store) => ({
    setAvailable(available: boolean) {
      patchState(store, { available });
    },
  })),
);

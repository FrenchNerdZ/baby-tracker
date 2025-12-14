import { inject } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

interface AuthState {
  user: User | undefined;
  loading: boolean;
  error: string | undefined;
}

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState<AuthState>({
    user: undefined,
    loading: true,
    error: undefined,
  }),
  withMethods((store, router = inject(Router)) => ({
    setLoading(loading: boolean) {
      patchState(store, { loading });
    },
    setUser(user: User | undefined): void {
      patchState(store, { user, loading: false });
      if (user) {
        router.navigate(['/', 'dashboard']).catch(console.error);
      }
    },
    setError(error: string): void {
      patchState(store, { error, loading: false });
    },
    logout(): void {
      patchState(store, { user: undefined });
      router.navigate(['/', 'login']).catch(console.error);
    },
  })),
);

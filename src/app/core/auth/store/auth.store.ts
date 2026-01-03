import { inject } from '@angular/core';
import { AuthService } from '@core/auth/service/auth.service';
import { SignInPayload, SignUpPayload } from '@core/type/auth.type';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { User } from '@supabase/supabase-js';

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
  withMethods((store, authService = inject(AuthService)) => ({
    async onInit() {
      const { data } = await authService.session;
      patchState(store, { user: data.session?.user, loading: false });

      authService.onAuthStateChange((_event, session) => {
        if (store.user()?.id !== session?.user.id) {
          patchState(store, {
            user: session?.user,
            loading: false,
          });
        }
      });
    },

    async signInWithEmail(payload: SignInPayload) {
      patchState(store, { loading: true, error: undefined });
      const { error } = await authService.signInWithEmail(payload);
      if (error) patchState(store, { loading: false, error: error.message });
    },

    async signUpWithEmail(payload: SignUpPayload) {
      patchState(store, { loading: true, error: undefined });
      const { error } = await authService.signUpWithEmail(payload);
      if (error) patchState(store, { loading: false, error: error.message });
    },

    async signOut() {
      await authService.signOut();
    },
  })),
);

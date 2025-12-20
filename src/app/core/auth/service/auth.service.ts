import { inject, Injectable } from '@angular/core';
import { SUPABASE_CLIENT } from '@core/token/supabase.token';
import { SignInPayload, SignUpPayload } from '@core/type/auth.type';
import { AuthChangeEvent, Session } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly supabase = inject(SUPABASE_CLIENT);

  public get session() {
    return this.supabase.auth.getSession();
  }

  public onAuthStateChange(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    return this.supabase.auth.onAuthStateChange(callback);
  }

  public signInWithEmail(payload: SignInPayload) {
    return this.supabase.auth.signInWithPassword({
      email: payload.email,
      password: payload.password,
    });
  }

  public signUpWithEmail(payload: SignUpPayload) {
    return this.supabase.auth.signUp({
      email: payload.email,
      password: payload.password,
      options: {
        data: {
          displayName: payload.name,
        },
      },
    });
  }

  public signOut() {
    return this.supabase.auth.signOut();
  }
}

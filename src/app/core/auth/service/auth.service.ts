import { inject, Injectable } from '@angular/core';
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from '@angular/fire/auth';
import { FIREBASE_AUTH_ERROR_MESSAGES, isFirebaseError } from '@core/auth/constant/auth.constant';
import { AuthStore } from '../store/auth.store';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly store = inject(AuthStore);

  constructor() {
    onAuthStateChanged(getAuth(), (user) => {
      this.store.setUser(user ?? undefined);
    });
  }

  public async login(email: string, password: string): Promise<void> {
    this.store.setLoading(true);
    try {
      const { user } = await signInWithEmailAndPassword(getAuth(), email, password);
      return this.store.setUser(user);
    } catch (error) {
      const firebaseErrorMessage = isFirebaseError(error)
        ? FIREBASE_AUTH_ERROR_MESSAGES[error.code]
        : undefined;
      this.store.setError(firebaseErrorMessage ?? 'Login failed.');
    }
  }

  public async loginWithGoogle(): Promise<void> {
    this.store.setLoading(true);
    try {
      const { user } = await signInWithPopup(getAuth(), new GoogleAuthProvider());
      return this.store.setUser(user);
    } catch (error) {
      const firebaseErrorMessage = isFirebaseError(error)
        ? FIREBASE_AUTH_ERROR_MESSAGES[error.code]
        : undefined;
      this.store.setError(firebaseErrorMessage ?? 'Login failed.');
    }
  }

  public async logout(): Promise<void> {
    return signOut(getAuth()).then(() => this.store.logout());
  }
}

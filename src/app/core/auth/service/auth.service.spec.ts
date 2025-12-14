import { TestBed } from '@angular/core/testing';
import * as auth from '@angular/fire/auth';
import { FIREBASE_AUTH_ERROR_MESSAGES } from '@core/auth/constant/auth.constant';
import { AuthService } from '@core/auth/service/auth.service';
import { AuthStore } from '@core/auth/store/auth.store';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const voidFunction = () => {};

describe('AuthService', () => {
  let service: AuthService;
  let authStore: InstanceType<typeof AuthStore>;

  beforeEach(() => {
    vi.clearAllMocks();

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        {
          provide: AuthStore,
          useValue: {
            setUser: vi.fn(),
            setLoading: vi.fn(),
            setError: vi.fn(),
            logout: vi.fn(),
          },
        },
      ],
    });

    service = TestBed.inject(AuthService);
    authStore = TestBed.inject(AuthStore);
  });

  it('should set user on auth state changed', () => {
    expect(authStore.setUser).toHaveBeenCalledWith({ uid: '123' });
  });

  it('should set user undefined if user is nullable', () => {
    vi.spyOn(auth, 'onAuthStateChanged').mockImplementationOnce(
      (_auth, nextOrObserver: auth.NextOrObserver<auth.User | null>) => {
        if (typeof nextOrObserver === 'function') {
          // eslint-disable-next-line unicorn/no-null
          nextOrObserver(null);
        } else {
          // eslint-disable-next-line unicorn/no-null
          nextOrObserver.next?.(null);
        }
        return voidFunction;
      },
    );
    expect(authStore.setUser).toHaveBeenCalledWith({ uid: '123' });
  });

  describe('#login', () => {
    it('should login with email/password', async () => {
      await service.login('test@test.com', '123456');
      expect(authStore.setLoading).toHaveBeenCalledWith(true);
      expect(authStore.setUser).toHaveBeenCalledWith({ uid: '123' });
    });

    it('should handle login unknown error', async () => {
      const error = {};
      vi.spyOn(auth, 'signInWithEmailAndPassword').mockRejectedValueOnce(error);

      await service.login('test@test.com', 'wrongpass');

      expect(authStore.setError).toHaveBeenCalledWith('Login failed.');
    });

    it('should handle login firebase unknown error', async () => {
      const error = { code: 'auth/unknown-error' };
      vi.spyOn(auth, 'signInWithEmailAndPassword').mockRejectedValueOnce(error);

      await service.login('test@test.com', 'wrongpass');

      expect(authStore.setError).toHaveBeenCalledWith('Login failed.');
    });

    it('should handle login firebase "auth/wrong-password" error', async () => {
      const error = { code: 'auth/wrong-password' };

      vi.spyOn(auth, 'signInWithEmailAndPassword').mockRejectedValueOnce(error);

      await service.login('test@test.com', 'wrongpass');

      expect(authStore.setLoading).toHaveBeenCalledWith(true);
      expect(authStore.setError).toHaveBeenCalledWith(
        FIREBASE_AUTH_ERROR_MESSAGES[error.code] ?? 'Login failed.',
      );
    });
  });

  describe('#loginWithGoogle', () => {
    it('should login with Google', async () => {
      await service.loginWithGoogle();
      expect(authStore.setLoading).toHaveBeenCalledWith(true);
      expect(authStore.setUser).toHaveBeenCalledWith({ uid: 'google-uid' });
    });

    it('should handle Google login unknown error', async () => {
      const error = {};
      vi.spyOn(auth, 'signInWithPopup').mockRejectedValueOnce(error);

      await service.loginWithGoogle();

      expect(authStore.setError).toHaveBeenCalledWith('Login failed.');
    });

    it('should handle Google login firebase unknown error', async () => {
      const error = { code: 'auth/unknown-error' };
      vi.spyOn(auth, 'signInWithPopup').mockRejectedValueOnce(error);

      await service.loginWithGoogle();

      expect(authStore.setError).toHaveBeenCalledWith('Login failed.');
    });

    it('should handle Google login firebase "popup-closed-by-user" error', async () => {
      const error = { code: 'auth/popup-closed-by-user' };

      vi.spyOn(auth, 'signInWithPopup').mockRejectedValueOnce(error);

      await service.loginWithGoogle();

      expect(authStore.setLoading).toHaveBeenCalledWith(true);
      expect(authStore.setError).toHaveBeenCalledWith(
        FIREBASE_AUTH_ERROR_MESSAGES[error.code] ?? 'Login failed.',
      );
    });
  });

  it('should logout', async () => {
    await service.logout();
    expect(authStore.logout).toHaveBeenCalled();
  });
});

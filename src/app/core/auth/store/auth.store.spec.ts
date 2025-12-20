import { TestBed } from '@angular/core/testing';
import { AuthService } from '@core/auth/service/auth.service';
import { AuthStore } from '@core/auth/store/auth.store';
import { SignInPayload, SignUpPayload } from '@core/type/auth.type';
import {
  AuthChangeEvent,
  AuthResponse,
  AuthTokenResponsePassword,
  Session,
} from '@supabase/supabase-js';
import { describe } from 'vitest';

describe('AuthStore', () => {
  let authStore: InstanceType<typeof AuthStore>;
  let authServiceMock: AuthService;
  let callback: ((event: AuthChangeEvent, session: Session | null) => void) | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AuthService,
          useValue: {
            session: Promise.resolve({ data: { session: { user: { id: '123' } } } }),
            signInWithEmail: vi.fn(() => Promise.resolve({ error: undefined })),
            signUpWithEmail: vi.fn(() => Promise.resolve({ error: undefined })),
            signOut: vi.fn(() => Promise.resolve()),
            onAuthStateChange: vi.fn((callback_) => {
              callback = callback_;
            }),
          },
        },
      ],
    });

    authStore = TestBed.inject(AuthStore);
    authServiceMock = TestBed.inject(AuthService);
  });

  it('should initialize user from session on init', () => {
    expect(authStore.user()).toEqual({ id: '123' });
    expect(authStore.loading()).toBe(false);
  });

  describe('should update user when auth state changes', () => {
    it('should update user when auth state changes with different user id', () => {
      callback?.('SIGNED_IN', { user: { id: '456' } } as unknown as Session);

      expect(authStore.user()).toEqual({ id: '456' });
      expect(authStore.loading()).toBe(false);
    });

    it('should update user when auth state changes with same user id', () => {
      callback?.('SIGNED_IN', { user: { id: '123' } } as unknown as Session);

      expect(authStore.user()).toEqual({ id: '123' });
      expect(authStore.loading()).toBe(false);
    });

    it('should update user when auth state changes with session is null', () => {
      // eslint-disable-next-line unicorn/no-null
      callback?.('SIGNED_IN', null);

      expect(authStore.user()).toBeUndefined();
      expect(authStore.loading()).toBe(false);
    });
  });

  describe('#signInWithEmail', () => {
    const payload: SignInPayload = { email: 'a@b.com', password: '123' };

    it('should call signInWithEmail and set error on failure', async () => {
      const spyAuthServiceSignInWithEmail = vi
        .spyOn(authServiceMock, 'signInWithEmail')
        .mockResolvedValueOnce({
          error: {
            message: 'Invalid credentials',
          },
        } as unknown as AuthTokenResponsePassword);

      await authStore.signInWithEmail(payload);
      expect(spyAuthServiceSignInWithEmail).toHaveBeenCalledWith(payload);
      expect(authStore.error()).toBe('Invalid credentials');
      expect(authStore.loading()).toBe(false);
    });

    it('should call signInWithEmail and succeed', async () => {
      const spyAuthServiceSignInWithEmail = vi
        .spyOn(authServiceMock, 'signInWithEmail')
        .mockResolvedValueOnce({ error: undefined } as unknown as AuthTokenResponsePassword);

      await authStore.signInWithEmail(payload);
      expect(spyAuthServiceSignInWithEmail).toHaveBeenCalledWith(payload);
      expect(authStore.error()).toBeUndefined();
    });
  });

  describe('#signUpWithEmail', () => {
    const payload: SignUpPayload = { email: 'a@b.com', password: '123', name: 'Test' };

    it('should call signUpWithEmail and set error on failure', async () => {
      const spyAuthServiceSignUpWithEmail = vi
        .spyOn(authServiceMock, 'signUpWithEmail')
        .mockResolvedValueOnce({
          error: {
            message: 'Email exists',
          },
        } as unknown as AuthResponse);

      await authStore.signUpWithEmail(payload);
      expect(spyAuthServiceSignUpWithEmail).toHaveBeenCalledWith(payload);
      expect(authStore.error()).toBe('Email exists');
      expect(authStore.loading()).toBe(false);
    });

    it('should call signUpWithEmail and succeed', async () => {
      const spyAuthServiceSignUpWithEmail = vi
        .spyOn(authServiceMock, 'signUpWithEmail')
        .mockResolvedValueOnce({ error: undefined } as unknown as AuthResponse);

      await authStore.signUpWithEmail(payload);
      expect(spyAuthServiceSignUpWithEmail).toHaveBeenCalledWith(payload);
      expect(authStore.error()).toBeUndefined();
    });
  });

  it('should call signOut', async () => {
    await authStore.signOut();
    expect(authServiceMock.signOut).toHaveBeenCalled();
  });
});

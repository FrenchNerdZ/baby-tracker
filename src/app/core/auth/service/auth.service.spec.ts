import { TestBed } from '@angular/core/testing';
import { AuthService } from '@core/auth/service/auth.service';
import { SUPABASE_CLIENT } from '@core/token/supabase.token';
import { SupabaseClient } from '@supabase/supabase-js';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('AuthService', () => {
  let authService: AuthService;
  let supabaseMock: SupabaseClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        {
          provide: SUPABASE_CLIENT,
          useValue: {
            auth: {
              getSession: vi.fn(() =>
                Promise.resolve({ data: { session: { user: { id: '123' } } } }),
              ),
              onAuthStateChange: vi.fn(() => ({ unsubscribe: vi.fn() })),
              signInWithPassword: vi.fn(() =>
                Promise.resolve({ data: { user: { id: '123' } }, error: undefined }),
              ),
              signUp: vi.fn(() =>
                Promise.resolve({ data: { user: { id: '123' } }, error: undefined }),
              ),
              signOut: vi.fn(() => Promise.resolve({ error: undefined })),
            },
          },
        },
      ],
    });

    authService = TestBed.inject(AuthService);
    supabaseMock = TestBed.inject(SUPABASE_CLIENT);
  });

  it('should get session', async () => {
    const session = await authService.session;
    expect(supabaseMock.auth.getSession).toHaveBeenCalled();
    expect(session.data.session?.user.id).toBe('123');
  });

  it('should subscribe to auth state changes', () => {
    const spySupabaseAuthOnAuthStateChange = vi.spyOn(supabaseMock.auth, 'onAuthStateChange');
    const callback = vi.fn();
    const sub = authService.onAuthStateChange(callback);
    expect(spySupabaseAuthOnAuthStateChange).toHaveBeenCalledWith(callback);
    expect(sub).toBeDefined();
  });

  it('should sign in with email', async () => {
    const payload = { email: 'a@b.com', password: '123' };
    const result = await authService.signInWithEmail(payload);
    expect(supabaseMock.auth.signInWithPassword).toHaveBeenCalledWith(payload);
    expect(result.data.user?.id).toBe('123');
  });

  it('should sign up with email', async () => {
    const payload = { email: 'a@b.com', password: '123', name: 'Test' };
    const result = await authService.signUpWithEmail(payload);
    expect(supabaseMock.auth.signUp).toHaveBeenCalledWith({
      email: payload.email,
      password: payload.password,
      options: { data: { displayName: payload.name } },
    });
    expect(result.data.user?.id).toBe('123');
  });

  it('should sign out', async () => {
    await authService.signOut();
    expect(supabaseMock.auth.signOut).toHaveBeenCalled();
  });
});

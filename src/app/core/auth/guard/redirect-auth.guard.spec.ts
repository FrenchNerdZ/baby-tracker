import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  provideRouter,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthStore } from '@core/auth/store/auth.store';
import { User } from '@supabase/supabase-js';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { authGuard } from './auth.guard';

describe('authGuard', () => {
  let router: Router;
  const userSignal = signal<User | undefined>(undefined);
  const activatedRouteSnapshotMock = {} as unknown as ActivatedRouteSnapshot;
  const routerStateSnapshotMock = {} as unknown as RouterStateSnapshot;
  const urlTreeMock = { fragment: 'test' } as unknown as UrlTree;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AuthStore,
          useValue: {
            user: userSignal,
          },
        },
        provideRouter([]),
      ],
    });
    router = TestBed.inject(Router);
    vi.spyOn(router, 'createUrlTree').mockReturnValue(urlTreeMock);
  });

  it('should return true when user is authenticated', () => {
    userSignal.set({ id: '123', email: 'test@example.com' } as unknown as User);

    const result = TestBed.runInInjectionContext(() =>
      authGuard(activatedRouteSnapshotMock, routerStateSnapshotMock),
    );

    expect(result).toBe(true);
    expect(router.createUrlTree).not.toHaveBeenCalled();
  });

  it('should return UrlTree to sign-in when user is not authenticated', () => {
    userSignal.set(undefined);

    const result = TestBed.runInInjectionContext(() =>
      authGuard(activatedRouteSnapshotMock, routerStateSnapshotMock),
    );

    expect(router.createUrlTree).toHaveBeenCalledWith(['/sign-in']);
    expect(result).toBe(urlTreeMock);
  });
});

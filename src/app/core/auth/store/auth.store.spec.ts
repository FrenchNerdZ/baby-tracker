import { TestBed } from '@angular/core/testing';
import { User } from '@angular/fire/auth';
import { provideRouter, Router } from '@angular/router';
import { AuthStore } from '@core/auth/store/auth.store';

describe('AuthStore', () => {
  let authStore: InstanceType<typeof AuthStore>;
  let router: Router;

  beforeEach(() => {
    vi.clearAllMocks();

    TestBed.configureTestingModule({
      providers: [AuthStore, provideRouter([])],
    });

    authStore = TestBed.inject(AuthStore);
    router = TestBed.inject(Router);
    vi.spyOn(router, 'navigate').mockResolvedValue(true);
  });

  it('should set loading', () => {
    authStore.setLoading(true);
    expect(authStore.loading()).toBe(true);
  });

  it('should set user and navigate to dashboard', () => {
    const mockUser = { uid: '123' } as User;
    authStore.setUser(mockUser);
    expect(authStore.user()).toEqual(mockUser);
    expect(authStore.loading()).toBe(false);

    expect(router.navigate).toHaveBeenCalledWith(['/', 'dashboard']);
  });

  it('should not navigate to dashboard if set nullable user', () => {
    authStore.setUser(undefined);
    expect(authStore.user()).toEqual(undefined);
    expect(authStore.loading()).toBe(false);

    expect(router.navigate).not.toHaveBeenCalledWith(['/', 'dashboard']);
  });

  it('should set error', () => {
    authStore.setError('Some error');
    expect(authStore.error()).toBe('Some error');
    expect(authStore.loading()).toBe(false);
  });

  it('should logout and navigate to login', () => {
    authStore.logout();
    expect(authStore.user()).toBeUndefined();
    expect(router.navigate).toHaveBeenCalledWith(['/', 'login']);
  });
});

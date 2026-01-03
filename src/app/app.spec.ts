import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router, RouterOutlet } from '@angular/router';
import { AuthStore } from '@core/auth/store/auth.store';
import { UpdateSonner } from '@core/update/component/update-sonner/update-sonner';
import { User } from '@supabase/supabase-js';
import { MockComponent } from 'ng-mocks';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { App } from './app';

describe('App', () => {
  let fixture: ComponentFixture<App>;
  let router: Router;
  const userSignal = signal<User | undefined>(undefined);

  beforeEach(async () => {
    vi.clearAllMocks();

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        {
          provide: AuthStore,
          useValue: {
            user: userSignal,
          },
        },
        provideRouter([]),
      ],
    })
      .overrideComponent(App, {
        set: {
          imports: [RouterOutlet, MockComponent(UpdateSonner)],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(App);
    router = TestBed.inject(Router);

    await fixture.whenStable();
  });

  it('should render mocked UpdateSonner', () => {
    const updateSonner = fixture.nativeElement.querySelector('bt-update-sonner');
    expect(updateSonner).toBeTruthy();
  });

  describe('when user is defined', () => {
    it('should navigate to babies list when user is set', () => {
      vi.spyOn(router, 'navigate').mockResolvedValue(true);

      userSignal.set({ id: '123' } as User);

      TestBed.tick();

      expect(router.navigate).toHaveBeenCalledWith(['/babies']);
    });

    it('should log error if navigation fails', async () => {
      const error = new Error('fail');
      vi.spyOn(router, 'navigate').mockRejectedValue(error);
      const spyConsoleError = vi.spyOn(console, 'error');

      userSignal.set({ id: '123' } as User);

      TestBed.tick();

      await Promise.resolve();

      expect(router.navigate).toHaveBeenCalledWith(['/babies']);
      expect(spyConsoleError).toHaveBeenCalledWith('Navigation failed:', '/babies', error);
    });

    it('should not navigate if user is undefined', async () => {
      vi.spyOn(router, 'navigate');

      userSignal.set(undefined);

      TestBed.tick();

      await Promise.resolve();

      expect(router.navigate).not.toHaveBeenCalled();
    });
  });
});

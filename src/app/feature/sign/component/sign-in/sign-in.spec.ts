import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { AuthStore } from '@core/auth/store/auth.store';
import { NgIcon } from '@ng-icons/core';
import { HlmAlert, HlmAlertDescription, HlmAlertIcon, HlmAlertTitle } from '@spartan-ng/helm/alert';
import { HlmButton } from '@spartan-ng/helm/button';
import {
  HlmCard,
  HlmCardAction,
  HlmCardContent,
  HlmCardDescription,
  HlmCardFooter,
  HlmCardHeader,
  HlmCardTitle,
} from '@spartan-ng/helm/card';
import { HlmField, HlmFieldGroup, HlmFieldLabel } from '@spartan-ng/helm/field';
import { HlmError } from '@spartan-ng/helm/form-field';
import { HlmInput } from '@spartan-ng/helm/input';
import { User } from '@supabase/supabase-js';
import { beforeEach, vi } from 'vitest';

import { SignIn } from './sign-in';

describe('SignIn', () => {
  let fixture: ComponentFixture<SignIn>;
  let authStoreMock: InstanceType<typeof AuthStore>;
  let router: Router;
  const userSignal = signal<User | undefined>(undefined);

  beforeEach(async () => {
    vi.clearAllMocks();

    await TestBed.configureTestingModule({
      imports: [
        SignIn,
        HlmButton,
        HlmCardHeader,
        HlmCard,
        HlmCardTitle,
        HlmCardDescription,
        HlmCardAction,
        HlmCardContent,
        HlmCardFooter,
        HlmError,
        HlmInput,
        HlmFieldGroup,
        HlmField,
        HlmFieldLabel,
        HlmAlert,
        NgIcon,
        HlmAlertIcon,
        HlmAlertDescription,
        HlmAlertTitle,
      ],
      providers: [
        {
          provide: AuthStore,
          useValue: {
            loading: signal(false),
            error: signal<string | undefined>(''),
            signInWithEmail: vi.fn(() => Promise.resolve()),
            user: userSignal,
          },
        },
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SignIn);
    authStoreMock = TestBed.inject(AuthStore);
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  describe('#submit', () => {
    beforeEach(() => {
      const emailInput: HTMLInputElement = fixture.nativeElement.querySelector(
        '#field-input-sign-in-email',
      );
      const passwordInput: HTMLInputElement = fixture.nativeElement.querySelector(
        '#field-input-sign-in-password',
      );

      emailInput.value = 'test@test.com';
      emailInput.dispatchEvent(new Event('input'));
      passwordInput.value = '123456';
      passwordInput.dispatchEvent(new Event('input'));

      fixture.detectChanges();
    });

    it('should call sign in when sign in button clicked', () => {
      const signInButton = fixture.nativeElement.querySelector('#submit-sign-in');
      signInButton.click();

      expect(authStoreMock.signInWithEmail).toHaveBeenCalledWith({
        email: 'test@test.com',
        password: '123456',
      });
    });

    it('should have log error sign in when sign in button clicked', async () => {
      const error = new Error('fail');
      vi.spyOn(authStoreMock, 'signInWithEmail').mockRejectedValue(error);

      const spyConsoleError = vi.spyOn(console, 'error');

      const signInButton = fixture.nativeElement.querySelector('#submit-sign-in');
      signInButton.click();

      await Promise.resolve();

      expect(authStoreMock.signInWithEmail).toHaveBeenCalledWith({
        email: 'test@test.com',
        password: '123456',
      });
      expect(spyConsoleError).toHaveBeenCalledWith('Sign in failed:', error);
    });
  });

  it('should navigate to sign-up route when sign up button clicked', () => {
    vi.spyOn(router, 'navigate').mockResolvedValue(true);

    const signUpButton = fixture.nativeElement.querySelector('#link-navigate-sign-up');
    signUpButton.click();

    expect(router.navigate).toHaveBeenCalledWith(['/sign-up']);
  });

  it('should have log error if navigation to sign-up fail when sign up button clicked', async () => {
    const error = new Error('fail');
    vi.spyOn(router, 'navigate').mockRejectedValue(error);

    const spyConsoleError = vi.spyOn(console, 'error');

    const signUpButton = fixture.nativeElement.querySelector('#link-navigate-sign-up');
    signUpButton.click();

    await Promise.resolve();

    expect(router.navigate).toHaveBeenCalledWith(['/sign-up']);
    expect(spyConsoleError).toHaveBeenCalledWith('Navigation failed:', '/sign-up', error);
  });
});

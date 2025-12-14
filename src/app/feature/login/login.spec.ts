import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AuthService } from '@core/auth/service/auth.service';
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
import { vi } from 'vitest';

import { Login } from './login';

describe('Login', () => {
  let fixture: ComponentFixture<Login>;
  let authService: AuthService;

  beforeEach(async () => {
    vi.clearAllMocks();

    await TestBed.configureTestingModule({
      imports: [
        Login,
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
          provide: AuthService,
          useValue: {
            login: vi.fn(() => Promise.resolve()),
            loginWithGoogle: vi.fn(() => Promise.resolve()),
          },
        },
        {
          provide: AuthStore,
          useValue: {
            loading: signal(false),
            error: signal<string | undefined>(''),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    authService = TestBed.inject(AuthService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should call login when login button clicked', () => {
    // remplir le formulaire via les inputs
    const emailInput: HTMLInputElement = fixture.debugElement.query(
      By.css('#field-input-login-email'),
    ).nativeElement;
    const passwordInput: HTMLInputElement = fixture.debugElement.query(
      By.css('#field-input-login-password'),
    ).nativeElement;

    emailInput.value = 'test@test.com';
    emailInput.dispatchEvent(new Event('input'));
    passwordInput.value = '123456';
    passwordInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // click sur le bouton submit
    const loginButton = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    loginButton.click();

    expect(authService.login).toHaveBeenCalledWith('test@test.com', '123456');
  });

  it('should call loginWithGoogle when Google button clicked', () => {
    const googleButton = fixture.debugElement.queryAll(By.css('button'))[2].nativeElement;
    googleButton.click();
    expect(authService.loginWithGoogle).toHaveBeenCalled();
  });
});

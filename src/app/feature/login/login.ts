import { Component, inject, signal } from '@angular/core';
import { email, Field, form, required, SchemaPathTree } from '@angular/forms/signals';
import { AuthService } from '@core/auth/service/auth.service';
import { AuthStore } from '@core/auth/store/auth.store';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCircleAlert } from '@ng-icons/lucide';
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
import { LoginData } from './type/login.type';

@Component({
  selector: 'bt-login',
  imports: [
    Field,
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
  providers: [provideIcons({ lucideCircleAlert })],

  templateUrl: './login.html',
})
export class Login {
  private readonly loginModel = signal<LoginData>({
    email: '',
    password: '',
  });

  private readonly loginSchema = (schemaPath: SchemaPathTree<LoginData>) => {
    required(schemaPath.email, { message: 'Email is required' });
    email(schemaPath.email, { message: 'Enter a valid email address' });
    required(schemaPath.password, { message: 'Password is required' });
  };

  private readonly authStore = inject(AuthStore);
  private readonly authService = inject(AuthService);

  protected loginForm = form(this.loginModel, this.loginSchema);

  protected loading = this.authStore.loading;
  protected error = this.authStore.error;

  protected submit(event: Event): void {
    event.preventDefault();

    const { email, password } = this.loginModel();
    this.authService.login(email, password).catch(console.error);
  }

  protected loginWithGoogle(): void {
    this.authService.loginWithGoogle().catch(console.error);
  }
}

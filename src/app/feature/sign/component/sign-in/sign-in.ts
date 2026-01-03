import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { email, Field, form, required, SchemaPathTree } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { AuthStore } from '@core/auth/store/auth.store';
import { SignInPayload } from '@core/type/auth.type';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCircleAlert } from '@ng-icons/lucide';
import { HlmAlert, HlmAlertDescription, HlmAlertIcon, HlmAlertTitle } from '@spartan-ng/helm/alert';
import { HlmButton } from '@spartan-ng/helm/button';
import {
  HlmCard,
  HlmCardContent,
  HlmCardDescription,
  HlmCardFooter,
  HlmCardHeader,
  HlmCardTitle,
} from '@spartan-ng/helm/card';
import { HlmField, HlmFieldGroup, HlmFieldLabel } from '@spartan-ng/helm/field';
import { HlmError } from '@spartan-ng/helm/form-field';
import { HlmInput } from '@spartan-ng/helm/input';
import { HlmSpinner } from '@spartan-ng/helm/spinner';

@Component({
  selector: 'bt-sign-in',
  imports: [
    Field,
    HlmButton,
    HlmCardHeader,
    HlmCard,
    HlmCardTitle,
    HlmCardDescription,
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
    HlmSpinner,
  ],
  providers: [provideIcons({ lucideCircleAlert })],
  templateUrl: './sign-in.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignIn {
  private readonly signInModel = signal<SignInPayload>({
    email: '',
    password: '',
  });

  private readonly signInSchema = (schemaPath: SchemaPathTree<SignInPayload>) => {
    required(schemaPath.email, { message: 'Email is required' });
    email(schemaPath.email, { message: 'Enter a valid email address' });
    required(schemaPath.password, { message: 'Password is required' });
  };

  private readonly authStore = inject(AuthStore);
  private readonly router = inject(Router);

  protected signInForm = form(this.signInModel, this.signInSchema);

  protected loading = this.authStore.loading;
  protected error = this.authStore.error;

  protected submit(event: Event): void {
    event.preventDefault();

    this.authStore
      .signInWithEmail(this.signInModel())
      .catch((error) => console.error('Sign in failed:', error));
  }

  protected navigateToSignUp(): void {
    this.router.navigate(['/sign-up']).catch((error) => {
      console.error('Navigation failed:', '/sign-up', error);
    });
  }
}

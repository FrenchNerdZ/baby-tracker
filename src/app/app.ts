import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthStore } from '@core/auth/store/auth.store';
import { UpdateSonner } from '@core/update/component/update-sonner/update-sonner';

@Component({
  selector: 'bt-root',
  imports: [RouterOutlet, UpdateSonner],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private readonly authStore = inject(AuthStore);
  private readonly router = inject(Router);

  constructor() {
    effect(() => {
      if (this.authStore.user()) {
        this.router.navigate(['/dashboard']).catch((error) => {
          console.error('Navigation failed:', '/dashboard', error);
        });
      }
    });
  }
}

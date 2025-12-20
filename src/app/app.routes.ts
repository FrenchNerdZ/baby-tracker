import { Routes } from '@angular/router';
import { authGuard } from '@core/auth/guard/auth.guard';
import { redirectAuthGuard } from '@core/auth/guard/redirect-auth.guard';

export const routes: Routes = [
  {
    path: 'sign-in',
    loadComponent: () => import('./feature/sign/component/sign-in/sign-in').then((m) => m.SignIn),
    canActivate: [redirectAuthGuard],
  },
  {
    path: 'sign-up',
    loadComponent: () => import('./feature/sign/component/sign-up/sign-up').then((m) => m.SignUp),
    canActivate: [redirectAuthGuard],
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./feature/dashboard/dashboard').then((m) => m.Dashboard),
    canActivate: [authGuard],
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];

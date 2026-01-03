import { Routes } from '@angular/router';
import { babiesResolver, babyResolver } from '@baby/resolver/baby.resolver';
import { authGuard } from '@core/auth/guard/auth.guard';
import { redirectAuthGuard } from '@core/auth/guard/redirect-auth.guard';
import { dayResolver, daysResolver } from '@day/resolver/day.resolver';

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
    path: 'empty',
    loadComponent: () => import('./core/empty-state/empty-state').then((m) => m.EmptyState),
  },
  {
    path: 'babies',
    loadComponent: () =>
      import('./feature/baby/component/baby-list/baby-list').then((m) => m.BabyList),
    resolve: { babies: babiesResolver },
    canActivate: [authGuard],
  },
  {
    path: 'babies/:babyId',
    loadComponent: () => import('@baby/component/baby/baby').then((m) => m.Baby),
    resolve: { baby: babyResolver },
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'days', pathMatch: 'full' },
      {
        path: 'days',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./feature/day/component/day-list/day-list').then((m) => m.DayList),
            resolve: { days: daysResolver },
          },
          {
            path: ':date',
            loadComponent: () => import('./feature/day/component/day/day').then((m) => m.Day),
            resolve: { daily: dayResolver },
          },
          {
            path: 'events/new',
            loadComponent: () =>
              import('./feature/event/component/event-sheet/event-sheet').then((m) => m.EventSheet),
            outlet: 'sheet',
          },
        ],
      },
    ],
  },
];

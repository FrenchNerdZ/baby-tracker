import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BabyStore } from '@baby/store/baby.store';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideBaby } from '@ng-icons/lucide';
import { AppTitleBar } from '@shared/component/app-title-bar/app-title-bar';
import { HlmButton } from '@spartan-ng/helm/button';
import {
  HlmEmpty,
  HlmEmptyContent,
  HlmEmptyDescription,
  HlmEmptyHeader,
  HlmEmptyMedia,
  HlmEmptyTitle,
} from '@spartan-ng/helm/empty';
import { HlmIcon } from '@spartan-ng/helm/icon';
import {
  HlmItem,
  HlmItemContent,
  HlmItemDescription,
  HlmItemGroup,
  HlmItemMedia,
  HlmItemTitle,
} from '@spartan-ng/helm/item';

@Component({
  imports: [
    HlmEmpty,
    HlmEmptyHeader,
    HlmEmptyTitle,
    HlmEmptyDescription,
    HlmEmptyContent,
    NgIcon,
    HlmEmptyMedia,
    HlmButton,
    HlmIcon,
    HlmItemGroup,
    HlmItem,
    HlmItemMedia,
    HlmItemContent,
    HlmItemTitle,
    HlmItemDescription,
    DatePipe,
    RouterLink,
    AppTitleBar,
  ],
  providers: [
    provideIcons({
      lucideBaby,
    }),
  ],
  templateUrl: './baby-list.html',
  selector: 'bt-baby-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BabyList {
  private readonly babyStore = inject(BabyStore);

  protected readonly babies = this.babyStore.babies;
}

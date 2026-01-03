import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Day } from '@day/type/daily.type';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideBath,
  lucideChevronRight,
  lucideDroplets,
  lucideMilk,
  lucidePill,
  lucideRadiation,
} from '@ng-icons/lucide';
import { RelativeDatePipe } from '@shared/pipe/relative-date-pipe';
import { TimeAgoPipe } from '@shared/pipe/time-ago-pipe';
import { HlmBadge } from '@spartan-ng/helm/badge';
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
  HlmItemActions,
  HlmItemContent,
  HlmItemDescription,
  HlmItemTitle,
} from '@spartan-ng/helm/item';

@Component({
  selector: 'bt-daily-list',
  imports: [
    HlmItem,
    HlmItemTitle,
    HlmItemActions,
    HlmIcon,
    HlmItemContent,
    NgIcon,
    HlmBadge,
    HlmItemDescription,
    HlmButton,
    HlmEmpty,
    HlmEmptyContent,
    HlmEmptyDescription,
    HlmEmptyHeader,
    HlmEmptyMedia,
    HlmEmptyTitle,
    RelativeDatePipe,
    RouterLink,
    TimeAgoPipe,
  ],
  providers: [
    provideIcons({
      lucideChevronRight,
      lucideMilk,
      lucideDroplets,
      lucideRadiation,
      lucidePill,
      lucideBath,
    }),
  ],
  templateUrl: './day-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DayList {
  protected readonly days = input.required<Array<Day>>();
}

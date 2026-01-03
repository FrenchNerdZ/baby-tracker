import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { BabyStore } from '@baby/store/baby.store';
import { BabyEventType } from '@event/model/event.model';
import { provideIcons } from '@ng-icons/core';
import {
  lucideBath,
  lucideDroplets,
  lucideMilk,
  lucidePill,
  lucideRadiation,
} from '@ng-icons/lucide';
import { AppTitleBar } from '@shared/component/app-title-bar/app-title-bar';
import { HlmFloatingButton, HlmFloatingSubButton } from '@spartan-ng/helm/floating-button';

@Component({
  selector: 'bt-baby',
  imports: [AppTitleBar, RouterOutlet, HlmFloatingButton, HlmFloatingSubButton],
  providers: [
    provideIcons({ lucideMilk, lucideDroplets, lucideRadiation, lucidePill, lucideBath }),
  ],
  templateUrl: './baby.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Baby {
  private readonly babyStore = inject(BabyStore);

  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  protected readonly babyName = computed(() => {
    return this.babyStore.selectedBaby()?.name;
  });

  protected readonly addMilk = () => this.openEventSheet('milk');

  protected readonly addPee = () => this.openEventSheet('pee');

  protected readonly addPoop = () => this.openEventSheet('poop');

  protected readonly addMedicine = () => this.openEventSheet('medicine');

  protected readonly addBath = () => this.openEventSheet('bath');

  protected async openEventSheet(babyEventType: BabyEventType) {
    await this.router.navigate([{ outlets: { sheet: ['events', 'new'] } }], {
      relativeTo: this.route.firstChild,
      queryParams: { type: babyEventType },
    });
  }
}

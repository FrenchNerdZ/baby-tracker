import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowUpRight, lucideFolderCode } from '@ng-icons/lucide';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmEmptyImports } from '@spartan-ng/helm/empty';
import { HlmIcon } from '@spartan-ng/helm/icon';

@Component({
  selector: 'bt-empty-state',
  imports: [NgIcon, HlmIcon, HlmButton, HlmEmptyImports],
  providers: [provideIcons({ lucideFolderCode, lucideArrowUpRight })],
  templateUrl: './empty-state.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyState {
  constructor() {
    console.log('dfsfsdf');
  }
}

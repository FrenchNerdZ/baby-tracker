import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HlmSeparator } from '@spartan-ng/helm/separator';

@Component({
  selector: 'bt-app-title-bar',
  imports: [HlmSeparator],
  templateUrl: './app-title-bar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppTitleBar {}

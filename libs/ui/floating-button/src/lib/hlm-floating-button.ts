import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  effect,
  ElementRef,
  HostListener,
  inject,
  input,
  signal,
} from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucidePlus } from '@ng-icons/lucide';
import { hlm } from '@spartan-ng/helm/utils';
import type { ClassValue } from 'clsx';
import { HlmButton } from '../../../button/src';
import { HlmIcon } from '../../../icon/src';
import { HlmFloatingSubButton } from './hlm-floating-sub-button';

@Component({
  selector: 'hlm-floating-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': '_computedClass()' },
  template: `
    <div class="relative flex items-center">
      <ng-content select="hlm-floating-sub-button"></ng-content>

      <button hlmBtn [size]="'floating'" [variant]="'default'" (click)="toggle()" class="z-50">
        <ng-icon hlm size="base" name="lucidePlus" />
      </button>
    </div>
  `,
  imports: [HlmButton, HlmIcon, NgIcon],
  providers: [provideIcons({ lucidePlus })],
})
export class HlmFloatingButton {
  public readonly userClass = input<ClassValue>('', { alias: 'class' });

  protected readonly subButtons = contentChildren<HlmFloatingSubButton>(HlmFloatingSubButton);

  protected readonly _computedClass = computed(() =>
    hlm('fixed bottom-4 right-4 z-50', this.userClass()),
  );

  private readonly _open = signal(false);
  private readonly el = inject(ElementRef);

  @HostListener('document:click', ['$event'])
  public clickout(event: MouseEvent): void {
    if (!this.el.nativeElement.contains(event.target)) {
      this._open.set(false);
    }
  }

  constructor() {
    effect(() => {
      const isOpen = this._open();
      const subButtons = this.subButtons();

      if (subButtons) {
        subButtons.forEach((btn, index) => {
          btn.setOpen(isOpen, index);
          btn.clicked?.subscribe(() => this._open.set(false));
        });
      }
    });
  }

  protected toggle(): void {
    this._open.set(!this._open());
  }
}

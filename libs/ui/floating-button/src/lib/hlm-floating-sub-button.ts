import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { hlm } from '@spartan-ng/helm/utils';
import type { ClassValue } from 'clsx';
import { HlmButton } from '../../../button/src';
import { HlmIcon } from '../../../icon/src';

@Component({
  selector: 'hlm-floating-sub-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': '_computedClass()',
    '[style.transform]': '_transform()',
    '[style.transitionDelay]': '_transitionDelay()',
  },
  template: `<button hlmBtn [size]="'icon-lg'" [variant]="'secondary'" (click)="onClick()">
    <ng-icon hlm size="base" [name]="icon()" />
  </button>`,
  imports: [HlmButton, NgIcon, HlmIcon],
})
export class HlmFloatingSubButton {
  public readonly icon = input.required<string>();

  public readonly action = input.required<() => void>();

  public readonly userClass = input<ClassValue>('', { alias: 'class' });

  public readonly clicked = output<void>();

  protected readonly _transform = computed(() =>
    this._open()
      ? `translateY(-${(this._index() + 1) * this._spacing() + 0.5}rem)`
      : 'translateY(0)',
  );

  protected readonly _computedClass = computed(() =>
    hlm(
      'absolute transition-all duration-150 ease-out opacity-0 pointer-events-none bottom-0 left-1/2 -translate-x-1/2 ',
      this._open() ? 'opacity-100 pointer-events-auto' : '',
    ),
  );

  protected readonly _transitionDelay = computed(() => `${this._index() * 50}ms`);

  private readonly _open = signal(false);
  private readonly _index = signal(0);
  private readonly _spacing = signal(3.2);

  public setOpen(open: boolean, index: number): void {
    this._open.set(open);
    this._index.set(index);
  }

  public onClick(): void {
    this.clicked.emit();
    this.action()();
  }
}

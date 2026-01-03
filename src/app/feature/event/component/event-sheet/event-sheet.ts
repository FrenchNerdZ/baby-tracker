import { Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
  viewChild,
} from '@angular/core';
import { BrnSheet, BrnSheetContent } from '@spartan-ng/brain/sheet';
import { HlmSheet, HlmSheetContent, HlmSheetHeader, HlmSheetTitle } from '@spartan-ng/helm/sheet';

@Component({
  selector: 'bt-event-sheet',
  imports: [HlmSheet, HlmSheetContent, HlmSheetHeader, HlmSheetTitle, BrnSheetContent],
  templateUrl: './event-sheet.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventSheet implements OnInit {
  public readonly type = input.required<string>();

  public readonly viewchildSheetRef = viewChild(BrnSheet);

  private readonly location = inject(Location);

  public ngOnInit(): void {
    this.viewchildSheetRef()?.open();
  }

  protected close() {
    this.location.back();
  }
}

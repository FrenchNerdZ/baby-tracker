import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  linkedSignal,
  output,
  signal,
} from '@angular/core';
import { Field, form, required, SchemaPathTree } from '@angular/forms/signals';
import { BabyEvent, BabyEventForm } from '@event/model/event.model';
import { EventService } from '@event/service/event.service';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideBath,
  lucideCircleAlert,
  lucideDroplets,
  lucideMilk,
  lucidePill,
  lucideRadiation,
} from '@ng-icons/lucide';
import { HlmAlert, HlmAlertDescription, HlmAlertIcon, HlmAlertTitle } from '@spartan-ng/helm/alert';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmDatePicker } from '@spartan-ng/helm/date-picker';
import { HlmField, HlmFieldGroup, HlmFieldLabel } from '@spartan-ng/helm/field';
import { HlmError } from '@spartan-ng/helm/form-field';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { HlmInput } from '@spartan-ng/helm/input';
import { HlmLabel } from '@spartan-ng/helm/label';
import { HlmRadio, HlmRadioGroup } from '@spartan-ng/helm/radio-group';
import { HlmSheetFooter } from '@spartan-ng/helm/sheet';
import { HlmSpinner } from '@spartan-ng/helm/spinner';
import { HlmTextarea } from '@spartan-ng/helm/textarea';
import { hlm } from '@spartan-ng/helm/utils';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'bt-baby-activity-form',
  imports: [
    HlmAlert,
    HlmAlertDescription,
    HlmAlertIcon,
    HlmAlertTitle,
    HlmField,
    HlmFieldGroup,
    HlmFieldLabel,
    HlmInput,
    NgIcon,
    HlmError,
    HlmLabel,
    Field,
    HlmTextarea,
    HlmDatePicker,
    HlmButton,
    HlmSpinner,
    HlmSheetFooter,
    HlmRadioGroup,
    HlmRadio,
    HlmIcon,
  ],
  providers: [
    provideIcons({
      lucideMilk,
      lucideDroplets,
      lucideRadiation,
      lucidePill,
      lucideBath,
      lucideCircleAlert,
    }),
  ],
  templateUrl: './event-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventForm {
  private readonly eventService = inject(EventService);

  public readonly babyEvent = input.required<BabyEvent>();

  protected readonly done = output<void>();

  protected readonly cardClass = hlm(
    'relative block space-x-0',
    // base card styles
    'border-border flex flex-col items-center justify-center rounded-lg border-1 px-4 py-8',
    // hover and background styles
    'bg-background hover:bg-accent/10 cursor-pointer transition-colors',
    // spacing for the icon and text
    '[&>span]:mt-4',
    // target the checked state properly
    '[&:has([data-checked=true])]:border-primary [&:has([data-checked=true])]:border-1',
  );

  private readonly eventModel = linkedSignal<BabyEventForm>(() => {
    const { event_type, event_at, quantity, notes } = this.babyEvent();

    const event_date = new Date(event_at);
    const hh = String(event_date.getHours()).padStart(2, '0');
    const mm = String(event_date.getMinutes()).padStart(2, '0');
    const ss = String(event_date.getSeconds()).padStart(2, '0');
    const event_time = `${hh}:${mm}:${ss}`;

    console.log(event_date, event_time);

    return {
      event_type,
      event_date,
      event_time,
      quantity,
      notes,
    };
  });

  private readonly eventSchema = (schemaPath: SchemaPathTree<BabyEventForm>) => {
    required(schemaPath.event_type, { message: 'Type is required' });
    required(schemaPath.event_date, { message: 'Date is required' });
    required(schemaPath.event_time, { message: 'Time is required' });
  };

  protected eventForm = form(this.eventModel, this.eventSchema);

  protected readonly loading = signal(false);
  protected readonly error = signal<string | undefined>(undefined);

  protected async submit(event: Event): Promise<void> {
    event.preventDefault();

    this.loading.set(true);
    try {
      const { error } = await this.eventService.addEvent(this.eventModel());
      if (error) {
        this.error.set(error.message);
      } else {
        toast('Event added successfully');
        this.done.emit();
      }
    } catch (error) {
      if (error instanceof Error) {
        this.error.set(error.message);
      } else {
        this.error.set('Unknown error');
      }
    } finally {
      this.loading.set(false);
    }
  }

  protected readonly provideIcons = provideIcons;
}

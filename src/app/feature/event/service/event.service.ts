import { inject, Injectable } from '@angular/core';
import { BabyStore } from '@baby/store/baby.store';
import { SUPABASE_CLIENT } from '@core/token/supabase.token';
import { BabyEventForm } from '@event/model/event.model';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private readonly supabase = inject(SUPABASE_CLIENT);

  private babyStore = inject(BabyStore);

  public addEvent(event: BabyEventForm) {
    const baby = this.babyStore.selectedBaby();

    const { event_date, event_time, event_type, quantity, notes } = event;

    const [hh, mm, ss] = event_time.split(':').map(Number);

    const localDate = new Date(
      event_date.getFullYear(),
      event_date.getMonth(),
      event_date.getDate(),
      hh,
      mm,
      ss,
    );
    if (baby) {
      return this.supabase.from('baby_event').insert({
        baby_id: baby.id,
        event_type,
        quantity,
        notes,
        event_at: localDate.toISOString(),
      });
    } else throw new Error('Baby is not selected');
  }
}

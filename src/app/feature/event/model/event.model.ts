export type BabyEventType = 'milk' | 'pee' | 'poop' | 'medicine' | 'bath';

export interface BabyEvent {
  id?: string;
  baby_id: string;
  event_type: BabyEventType;
  event_at: string;
  quantity: number;
  notes: string;
}

export type BabyEventForm = Omit<BabyEvent, 'id' | 'baby_id' | 'event_at'> & {
  event_date: Date;
  event_time: string;
};

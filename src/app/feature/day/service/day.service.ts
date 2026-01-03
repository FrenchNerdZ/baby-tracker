import { inject, Injectable } from '@angular/core';
import { SUPABASE_CLIENT } from '@core/token/supabase.token';
import { Day } from '@day/type/daily.type';

@Injectable({
  providedIn: 'root',
})
export class DayService {
  private readonly supabase = inject(SUPABASE_CLIENT);

  public async getDaysByBaby(babyId: string): Promise<Array<Day>> {
    const { data, error } = await this.supabase.rpc('get_days_by_baby', {
      p_baby_id: babyId,
    });

    if (error) {
      console.error(`Error getting days: ${error.message}`, `p_baby_id: ${babyId}`);
      throw error;
    }
    return (data ?? []) as Array<Day>;
  }
}

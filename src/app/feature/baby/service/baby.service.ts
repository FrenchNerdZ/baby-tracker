import { inject, Injectable } from '@angular/core';
import { Baby } from '@baby/model/baby.model';
import { SUPABASE_CLIENT } from '@core/token/supabase.token';

@Injectable({
  providedIn: 'root',
})
export class BabyService {
  private readonly supabase = inject(SUPABASE_CLIENT);

  public async getBabiesByUser(userId: string): Promise<Array<Baby>> {
    const { data, error } = await this.supabase.rpc('get_babies_by_user', {
      p_user_id: userId,
    });

    if (error) {
      console.error(`Error getting babies: ${error.message}`, `p_user_id: ${userId}`);
      throw error;
    }
    return (data ?? []) as Array<Baby>;
  }

  public async getBabyById(babyId: string): Promise<Baby> {
    const { data, error } = await this.supabase.from('baby').select('*').eq('id', babyId).single();

    if (error) {
      console.error(`Error getting baby: ${error.message}`, `id: ${babyId}`);
      throw error;
    }
    return data;
  }
}

import { TestBed } from '@angular/core/testing';
import { SUPABASE_CLIENT } from '@core/token/supabase.token';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { beforeEach, vi } from 'vitest';
import { environment } from '../../../environments/environment';

const supabaseClientMock = { PostgrestVersion: '21.1.1' } as unknown as SupabaseClient;

vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(() => supabaseClientMock),
  SupabaseClient: class {},
}));

describe('SUPABASE_CLIENT', () => {
  let client: SupabaseClient;

  beforeEach(() => {
    client = TestBed.inject(SUPABASE_CLIENT);
  });

  it('should provide a SupabaseClient instance via injection', () => {
    expect(client).toBe(supabaseClientMock);
  });

  it('factory should call createClient with environment variables', () => {
    expect(createClient).toHaveBeenCalledWith(environment.supabaseUrl, environment.supabaseAnonKey);
  });
});

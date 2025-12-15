import { TestBed } from '@angular/core/testing';
import { AuthStore } from '@core/auth/store/auth.store';
import { UpdateStore } from '@core/update/store/update.store';

describe('UpdateStore', () => {
  let updateStore: InstanceType<typeof UpdateStore>;

  beforeEach(() => {
    vi.clearAllMocks();

    TestBed.configureTestingModule({
      providers: [AuthStore],
    });

    updateStore = TestBed.inject(UpdateStore);
  });

  it('should set available', () => {
    updateStore.setAvailable(true);
    expect(updateStore.available()).toBe(true);
  });
});

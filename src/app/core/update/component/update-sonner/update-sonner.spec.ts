import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateService } from '@core/update/service/update.service';
import { UpdateStore } from '@core/update/store/update.store';
import { HlmToaster } from '@spartan-ng/helm/sonner';
import { MockComponent } from 'ng-mocks';
import { toast } from 'ngx-sonner';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { UpdateSonner } from './update-sonner';

vi.mock('ngx-sonner', () => ({
  toast: vi.fn(),
  NgxSonnerToaster: class {},
}));

describe('UpdateSonner', () => {
  let fixture: ComponentFixture<UpdateSonner>;
  let updateStoreMock: InstanceType<typeof UpdateStore>;
  let updateServiceMock: UpdateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateSonner],
      providers: [
        {
          provide: UpdateStore,
          useValue: {
            available: signal(false),
          },
        },
        {
          provide: UpdateService,
          useValue: {
            activateUpdate: vi.fn(),
          },
        },
      ],
    })
      .overrideComponent(UpdateSonner, {
        remove: { imports: [HlmToaster] },
        add: { imports: [MockComponent(HlmToaster)] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(UpdateSonner);
    updateStoreMock = TestBed.inject(UpdateStore);
    updateServiceMock = TestBed.inject(UpdateService);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should not show toast when no update is available', () => {
    fixture.detectChanges();
    expect(toast).not.toHaveBeenCalled();
  });

  describe('when update is available', () => {
    beforeEach(() => {
      vi.spyOn(updateStoreMock, 'available').mockReturnValue(true);

      fixture.detectChanges();
    });

    it('should show toast when update becomes available', () => {
      expect(toast).toHaveBeenCalledWith('New version installed', {
        description:
          'A new version of the application has been installed. Reload the app to apply the update.',
        action: {
          label: 'Reload',
          onClick: expect.any(Function),
        },
      });
    });

    it('should call activateUpdate when reload is clicked', () => {
      const toastCall = vi.mocked(toast).mock.calls[0];
      const action = toastCall[1]?.action;

      action?.onClick(new MouseEvent('click'));

      expect(updateServiceMock.activateUpdate).toHaveBeenCalled();
    });
  });
});

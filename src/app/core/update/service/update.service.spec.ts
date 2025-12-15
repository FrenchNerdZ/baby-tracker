import { TestBed } from '@angular/core/testing';
import { SwUpdate } from '@angular/service-worker';
import { reloadLocation } from '@core/helper/window.helper';
import { UpdateStore } from '@core/update/store/update.store';
import { of } from 'rxjs';
import { beforeEach, describe, vi } from 'vitest';

import { UpdateService } from './update.service';

vi.mock('@core/helper/window.helper', () => ({
  reloadLocation: vi.fn(),
}));

describe('UpdateService', () => {
  let updateService: UpdateService;
  let swUpdateMock: SwUpdate;
  let updateStoreMock: InstanceType<typeof UpdateStore>;

  const configureTestingModule = (swUpdateEnabled: boolean, versionUpdateType?: string): void => {
    TestBed.configureTestingModule({
      providers: [
        UpdateService,
        {
          provide: SwUpdate,
          useValue: {
            isEnabled: swUpdateEnabled,
            versionUpdates: of({ type: versionUpdateType }),
            activateUpdate: vi.fn(() => Promise.resolve()),
          },
        },
        {
          provide: UpdateStore,
          useValue: {
            setAvailable: vi.fn(),
          },
        },
      ],
    });
    updateService = TestBed.inject(UpdateService);
    swUpdateMock = TestBed.inject(SwUpdate);
    updateStoreMock = TestBed.inject(UpdateStore);
  };
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('when SwUpdate is enabled ', () => {
    describe('when version update is not ready', () => {
      beforeEach(() => {
        configureTestingModule(true, 'VERSION_NOT_READY');
      });

      it('should set updateStore available when not VERSION_READY event occurs', async () => {
        expect(updateStoreMock.setAvailable).not.toHaveBeenCalled();
      });
    });

    describe('when version update is ready', () => {
      beforeEach(() => {
        configureTestingModule(true, 'VERSION_READY');
      });

      it('should set updateStore available when VERSION_READY event occurs', async () => {
        expect(updateStoreMock.setAvailable).toHaveBeenCalledWith(true);
      });

      it('should activate update, call reloadLocation and set store', async () => {
        await updateService.activateUpdate();

        expect(swUpdateMock.activateUpdate).toHaveBeenCalled();
        expect(reloadLocation).toHaveBeenCalled();
        expect(updateStoreMock.setAvailable).toHaveBeenCalledWith(false);
      });

      it('should call catch and finally', async () => {
        swUpdateMock.activateUpdate = vi.fn(() => Promise.reject('err'));

        await updateService.activateUpdate();
        expect(updateStoreMock.setAvailable).toHaveBeenCalledWith(false);
      });
    });
  });

  describe('when SwUpdate is disabled', () => {
    beforeEach(() => {
      configureTestingModule(false);
    });

    it('should not call activateUpdate if SwUpdate is disabled', async () => {
      await updateService.activateUpdate();

      expect(swUpdateMock.activateUpdate).not.toHaveBeenCalled();
      expect(reloadLocation).not.toHaveBeenCalled();
      expect(updateStoreMock.setAvailable).not.toHaveBeenCalled();
    });
  });
});

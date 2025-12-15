import { inject, Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { reloadLocation } from '@core/helper/window.helper';
import { UpdateStore } from '@core/update/store/update.store';

@Injectable({
  providedIn: 'root',
})
export class UpdateService {
  private readonly swUpdate = inject(SwUpdate);
  private readonly updateStore = inject(UpdateStore);

  constructor() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates.subscribe((event) => {
        if (event.type === 'VERSION_READY') {
          this.updateStore.setAvailable(true);
        }
      });
    }
  }

  public async activateUpdate() {
    if (this.swUpdate.isEnabled) {
      try {
        await this.swUpdate.activateUpdate();
        reloadLocation();
      } catch (error) {
        console.error(error);
      } finally {
        this.updateStore.setAvailable(false);
      }
    }
  }
}

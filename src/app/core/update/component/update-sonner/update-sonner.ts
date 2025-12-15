import { Component, effect, inject } from '@angular/core';
import { UpdateService } from '@core/update/service/update.service';
import { UpdateStore } from '@core/update/store/update.store';
import { HlmToaster } from '@spartan-ng/helm/sonner';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'bt-update-sonner',
  imports: [HlmToaster],
  templateUrl: './update-sonner.html',
})
export class UpdateSonner {
  private readonly updateStore = inject(UpdateStore);
  private readonly updateService = inject(UpdateService);

  constructor() {
    effect(() => {
      const updateAvailable = this.updateStore.available();
      if (updateAvailable) {
        toast('New version installed', {
          description: `A new version of the application has been installed. Reload the app to apply the update.`,
          action: {
            label: 'Reload',
            onClick: () => this.updateService.activateUpdate(),
          },
        });
      }
    });
  }
}

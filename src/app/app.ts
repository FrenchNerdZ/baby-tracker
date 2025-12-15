import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UpdateSonner } from '@core/update/component/update-sonner/update-sonner';

@Component({
  selector: 'bt-root',
  imports: [RouterOutlet, UpdateSonner],
  templateUrl: './app.html',
})
export class App {}

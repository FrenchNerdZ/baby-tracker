import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterOutlet } from '@angular/router';
import { UpdateSonner } from '@core/update/component/update-sonner/update-sonner';
import { MockComponent } from 'ng-mocks';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from './app';

describe('App', () => {
  let fixture: ComponentFixture<App>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    })
      .overrideComponent(App, {
        set: {
          imports: [RouterOutlet, MockComponent(UpdateSonner)],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(App);
    await fixture.whenStable();
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render mocked UpdateSonner', () => {
    const updateSonner = fixture.nativeElement.querySelector('bt-update-sonner');
    expect(updateSonner).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppTitleBar } from './app-title-bar';

describe('AppTitleBar', () => {
  let component: AppTitleBar;
  let fixture: ComponentFixture<AppTitleBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppTitleBar],
    }).compileComponents();

    fixture = TestBed.createComponent(AppTitleBar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

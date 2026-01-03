import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventSheet } from './event-sheet';

describe('EventSheet', () => {
  let component: EventSheet;
  let fixture: ComponentFixture<EventSheet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventSheet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventSheet);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

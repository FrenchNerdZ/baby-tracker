import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BabyList } from './baby-list';

describe('BabyList', () => {
  let component: BabyList;
  let fixture: ComponentFixture<BabyList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BabyList],
    }).compileComponents();

    fixture = TestBed.createComponent(BabyList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

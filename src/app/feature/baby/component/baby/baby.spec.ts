import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { Baby } from './baby';

describe('Baby', () => {
  let component: Baby;
  let fixture: ComponentFixture<Baby>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Baby],
    }).compileComponents();

    fixture = TestBed.createComponent(Baby);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

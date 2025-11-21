import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripCard } from './trip-card';

// Test suite for TripCard component
describe('TripCard', () => {
  let component: TripCard;
  let fixture: ComponentFixture<TripCard>;

  // Setup before each test
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Test to ensure the component is created successfully
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

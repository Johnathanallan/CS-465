import { TestBed } from '@angular/core/testing';

import { Authentication } from './authentication';

// Unit tests for Authentication service
describe('Authentication', () => {
  let service: Authentication;

  // Setup before each test
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Authentication);
  });

  // Test to ensure the service is created successfully
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';
import { JwtInterceptor } from './jwt-interceptor';

// Test suite for JwtInterceptor
describe('JwtInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JwtInterceptor],
    });
  });

  // Test to ensure the interceptor is created successfully
  it('should be created', () => {
    const interceptor = TestBed.inject(JwtInterceptor);
    expect(interceptor).toBeTruthy();
  });
});

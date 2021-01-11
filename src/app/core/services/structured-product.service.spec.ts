import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { StructuredProductService } from './structured-product.service';

describe('StructuredProductService', () => {
  let service: StructuredProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(StructuredProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

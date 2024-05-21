import { TestBed } from '@angular/core/testing';

import { MetricaService } from './metrica.service';

describe('MetricaService', () => {
  let service: MetricaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetricaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

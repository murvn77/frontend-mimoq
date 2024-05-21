import { TestBed } from '@angular/core/testing';

import { ExperimentoService } from './experimento.service';

describe('ExperimentoService', () => {
  let service: ExperimentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExperimentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { DespliegueService } from './despliegue.service';

describe('DespliegueService', () => {
  let service: DespliegueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DespliegueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

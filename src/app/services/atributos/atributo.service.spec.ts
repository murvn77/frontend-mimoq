import { TestBed } from '@angular/core/testing';

import { AtributoService } from './atributo.service';

describe('AtributoService', () => {
  let service: AtributoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtributoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

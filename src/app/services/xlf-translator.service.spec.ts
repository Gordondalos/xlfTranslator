import { TestBed, inject } from '@angular/core/testing';

import { XlfTranslatorService } from './xlf-translator.service';

describe('XlfTranslatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [XlfTranslatorService]
    });
  });

  it('should be created', inject([XlfTranslatorService], (service: XlfTranslatorService) => {
    expect(service).toBeTruthy();
  }));
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperimentoComponent } from './experimento.component';

describe('ExperimentoComponent', () => {
  let component: ExperimentoComponent;
  let fixture: ComponentFixture<ExperimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperimentoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExperimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

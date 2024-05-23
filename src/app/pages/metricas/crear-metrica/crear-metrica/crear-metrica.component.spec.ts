import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearMetricaComponent } from './crear-metrica.component';

describe('CrearMetricaComponent', () => {
  let component: CrearMetricaComponent;
  let fixture: ComponentFixture<CrearMetricaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearMetricaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearMetricaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

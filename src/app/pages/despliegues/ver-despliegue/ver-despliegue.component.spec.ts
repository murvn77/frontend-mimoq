import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerDespliegueComponent } from './ver-despliegue.component';

describe('VerDespliegueComponent', () => {
  let component: VerDespliegueComponent;
  let fixture: ComponentFixture<VerDespliegueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerDespliegueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerDespliegueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

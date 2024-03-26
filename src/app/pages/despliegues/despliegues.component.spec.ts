import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesplieguesComponent } from './despliegues.component';

describe('DesplieguesComponent', () => {
  let component: DesplieguesComponent;
  let fixture: ComponentFixture<DesplieguesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesplieguesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DesplieguesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDesplieguesComponent } from './list-despliegues.component';

describe('ListDesplieguesComponent', () => {
  let component: ListDesplieguesComponent;
  let fixture: ComponentFixture<ListDesplieguesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListDesplieguesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListDesplieguesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListExperimentosComponent } from './list-experimentos.component';

describe('ListExperimentosComponent', () => {
  let component: ListExperimentosComponent;
  let fixture: ComponentFixture<ListExperimentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListExperimentosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListExperimentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProyectosComponent } from './list-proyectos.component';

describe('ListProyectosComponent', () => {
  let component: ListProyectosComponent;
  let fixture: ComponentFixture<ListProyectosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListProyectosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListProyectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

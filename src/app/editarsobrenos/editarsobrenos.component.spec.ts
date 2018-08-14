import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarsobrenosComponent } from './editarsobrenos.component';

describe('EditarsobrenosComponent', () => {
  let component: EditarsobrenosComponent;
  let fixture: ComponentFixture<EditarsobrenosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarsobrenosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarsobrenosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

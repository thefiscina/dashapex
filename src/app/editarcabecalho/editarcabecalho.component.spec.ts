import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarcabecalhoComponent } from './editarcabecalho.component';

describe('EditarcabecalhoComponent', () => {
  let component: EditarcabecalhoComponent;
  let fixture: ComponentFixture<EditarcabecalhoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarcabecalhoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarcabecalhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

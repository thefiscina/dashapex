import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarprojetoComponent } from './criarprojeto.component';

describe('CriarprojetoComponent', () => {
  let component: CriarprojetoComponent;
  let fixture: ComponentFixture<CriarprojetoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriarprojetoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarprojetoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

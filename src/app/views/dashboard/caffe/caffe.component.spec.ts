import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaffeComponent } from './caffe.component';

describe('CaffeComponent', () => {
  let component: CaffeComponent;
  let fixture: ComponentFixture<CaffeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaffeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaffeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RpInstanceComponent } from './rp-instance.component';

describe('RpInstanceComponent', () => {
  let component: RpInstanceComponent;
  let fixture: ComponentFixture<RpInstanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RpInstanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RpInstanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

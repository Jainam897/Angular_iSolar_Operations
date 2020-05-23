import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayViewSchedularComponent } from './day-view-schedular.component';

describe('DayViewSchedularComponent', () => {
  let component: DayViewSchedularComponent;
  let fixture: ComponentFixture<DayViewSchedularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayViewSchedularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayViewSchedularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

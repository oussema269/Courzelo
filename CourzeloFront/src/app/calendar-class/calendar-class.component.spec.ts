import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarClassComponent } from './calendar-class.component';

describe('CalendarClassComponent', () => {
  let component: CalendarClassComponent;
  let fixture: ComponentFixture<CalendarClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarClassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

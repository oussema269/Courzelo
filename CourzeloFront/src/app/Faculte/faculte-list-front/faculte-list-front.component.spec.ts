import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaculteListFrontComponent } from './faculte-list-front.component';

describe('FaculteListFrontComponent', () => {
  let component: FaculteListFrontComponent;
  let fixture: ComponentFixture<FaculteListFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaculteListFrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaculteListFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoleListFrontComponent } from './pole-list-front.component';

describe('PoleListFrontComponent', () => {
  let component: PoleListFrontComponent;
  let fixture: ComponentFixture<PoleListFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoleListFrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoleListFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

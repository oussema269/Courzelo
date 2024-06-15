import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoWayFactorPageComponent } from './two-way-factor-page.component';

describe('TwoWayFactorPageComponent', () => {
  let component: TwoWayFactorPageComponent;
  let fixture: ComponentFixture<TwoWayFactorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwoWayFactorPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwoWayFactorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

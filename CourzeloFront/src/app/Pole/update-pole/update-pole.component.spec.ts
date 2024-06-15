import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePoleComponent } from './update-pole.component';

describe('UpdatePoleComponent', () => {
  let component: UpdatePoleComponent;
  let fixture: ComponentFixture<UpdatePoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePoleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

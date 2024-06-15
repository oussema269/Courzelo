import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaculteListComponent } from './faculte-list.component';

describe('FaculteListComponent', () => {
  let component: FaculteListComponent;
  let fixture: ComponentFixture<FaculteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaculteListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaculteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

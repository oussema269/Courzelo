import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFaculteComponent } from './edit-faculte.component';

describe('EditFaculteComponent', () => {
  let component: EditFaculteComponent;
  let fixture: ComponentFixture<EditFaculteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFaculteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFaculteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

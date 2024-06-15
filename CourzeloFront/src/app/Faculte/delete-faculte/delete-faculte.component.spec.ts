import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFaculteComponent } from './delete-faculte.component';

describe('DeleteFaculteComponent', () => {
  let component: DeleteFaculteComponent;
  let fixture: ComponentFixture<DeleteFaculteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteFaculteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteFaculteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

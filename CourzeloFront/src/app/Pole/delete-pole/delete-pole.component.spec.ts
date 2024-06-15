import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePoleComponent } from './delete-pole.component';

describe('DeletePoleComponent', () => {
  let component: DeletePoleComponent;
  let fixture: ComponentFixture<DeletePoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletePoleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletePoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

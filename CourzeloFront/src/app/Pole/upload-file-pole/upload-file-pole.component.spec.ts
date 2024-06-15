import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadFilePoleComponent } from './upload-file-pole.component';

describe('UploadFilePoleComponent', () => {
  let component: UploadFilePoleComponent;
  let fixture: ComponentFixture<UploadFilePoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadFilePoleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadFilePoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

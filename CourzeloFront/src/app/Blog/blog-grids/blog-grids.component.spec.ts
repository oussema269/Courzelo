import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogGridsComponent } from './blog-grids.component';

describe('BlogGridsComponent', () => {
  let component: BlogGridsComponent;
  let fixture: ComponentFixture<BlogGridsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogGridsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogGridsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

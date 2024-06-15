import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutDomaineComponent } from './ajout-domaine.component';

describe('AjoutDomaineComponent', () => {
  let component: AjoutDomaineComponent;
  let fixture: ComponentFixture<AjoutDomaineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutDomaineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutDomaineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

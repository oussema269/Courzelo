import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFicheModuleComponent } from './add-fiche-module.component';

describe('AddFicheModuleComponent', () => {
  let component: AddFicheModuleComponent;
  let fixture: ComponentFixture<AddFicheModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFicheModuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFicheModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

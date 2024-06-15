import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RessourceMaterialsComponent } from './ressource-materials.component';

describe('RessourceMaterialsComponent', () => {
  let component: RessourceMaterialsComponent;
  let fixture: ComponentFixture<RessourceMaterialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RessourceMaterialsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RessourceMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

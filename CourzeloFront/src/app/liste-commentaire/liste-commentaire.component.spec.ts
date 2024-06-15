import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeCommentaireComponent } from './liste-commentaire.component';

describe('ListeCommentaireComponent', () => {
  let component: ListeCommentaireComponent;
  let fixture: ComponentFixture<ListeCommentaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeCommentaireComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeCommentaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

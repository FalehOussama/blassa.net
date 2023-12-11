import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentairesPage } from './commentaires.page';

describe('CommentairesPage', () => {
  let component: CommentairesPage;
  let fixture: ComponentFixture<CommentairesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CommentairesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MesNotesPage } from './mes-notes.page';

describe('MesNotesPage', () => {
  let component: MesNotesPage;
  let fixture: ComponentFixture<MesNotesPage>;

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(MesNotesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

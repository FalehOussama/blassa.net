import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MesNotesConduitePage } from './mes-notes-conduite.page';

describe('MesNotesConduitePage', () => {
  let component: MesNotesConduitePage;
  let fixture: ComponentFixture<MesNotesConduitePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MesNotesConduitePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

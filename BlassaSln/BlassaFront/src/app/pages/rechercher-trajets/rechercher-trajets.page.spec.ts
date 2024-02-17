import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RechercherTrajetsPage } from './rechercher-trajets.page';

describe('RechercherTrajetsPage', () => {
  let component: RechercherTrajetsPage;
  let fixture: ComponentFixture<RechercherTrajetsPage>;

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(RechercherTrajetsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

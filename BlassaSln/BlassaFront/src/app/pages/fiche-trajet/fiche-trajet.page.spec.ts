import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { FicheTrajetPage } from './fiche-trajet.page';

describe('FicheTrajetPage', () => {
  let component: FicheTrajetPage;
  let fixture: ComponentFixture<FicheTrajetPage>;

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(FicheTrajetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

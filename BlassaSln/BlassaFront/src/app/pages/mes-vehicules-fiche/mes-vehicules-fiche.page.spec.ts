import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MesVehiculesFichePage } from './mes-vehicules-fiche.page';

describe('MesVehiculesFichePage', () => {
  let component: MesVehiculesFichePage;
  let fixture: ComponentFixture<MesVehiculesFichePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MesVehiculesFichePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MesReservationsPage } from './mes-reservations.page';

describe('MesReservationsPage', () => {
  let component: MesReservationsPage;
  let fixture: ComponentFixture<MesReservationsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MesReservationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

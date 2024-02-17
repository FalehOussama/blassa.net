import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MesVehiculesPage } from './mes-vehicules.page';

describe('MesVehiculesPage', () => {
  let component: MesVehiculesPage;
  let fixture: ComponentFixture<MesVehiculesPage>;

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(MesVehiculesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

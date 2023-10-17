import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfilMembrePage } from './profil-membre.page';

describe('ProfilMembrePage', () => {
  let component: ProfilMembrePage;
  let fixture: ComponentFixture<ProfilMembrePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProfilMembrePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

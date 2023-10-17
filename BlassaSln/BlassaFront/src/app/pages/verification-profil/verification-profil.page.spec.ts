import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerificationProfilPage } from './verification-profil.page';

describe('VerificationProfilPage', () => {
  let component: VerificationProfilPage;
  let fixture: ComponentFixture<VerificationProfilPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VerificationProfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NouveauComptePage } from './nouveau-compte.page';

describe('NouveauComptePage', () => {
  let component: NouveauComptePage;
  let fixture: ComponentFixture<NouveauComptePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NouveauComptePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

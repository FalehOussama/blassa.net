import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NouveauTrajetPage } from './nouveau-trajet.page';

describe('NouveauTrajetPage', () => {
  let component: NouveauTrajetPage;
  let fixture: ComponentFixture<NouveauTrajetPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NouveauTrajetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

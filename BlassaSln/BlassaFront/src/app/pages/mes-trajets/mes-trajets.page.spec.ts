import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MesTrajetsPage } from './mes-trajets.page';

describe('MesTrajetsPage', () => {
  let component: MesTrajetsPage;
  let fixture: ComponentFixture<MesTrajetsPage>;

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(MesTrajetsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

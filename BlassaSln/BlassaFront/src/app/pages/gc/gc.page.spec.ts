import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { GCPage } from './gc.page';

describe('GCPage', () => {
  let component: GCPage;
  let fixture: ComponentFixture<GCPage>;

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(GCPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

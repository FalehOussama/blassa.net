import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { TablinksPage } from './tablinks.page';

describe('TablinksPage', () => {
  let component: TablinksPage;
  let fixture: ComponentFixture<TablinksPage>;

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(TablinksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreerAnnonceStepsComponent } from './creer-annonce-steps.component';

describe('CreerAnnonceStepsComponent', () => {
  let component: CreerAnnonceStepsComponent;
  let fixture: ComponentFixture<CreerAnnonceStepsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreerAnnonceStepsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreerAnnonceStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DomController } from '@ionic/angular';
import { ParralaxHeaderDirective } from './parralax-header.directive';

describe('ParralaxHeaderDirective', () => {
  it('should create an instance', () => {
    let elRefMock = {
      nativeElement: document.createElement('div')
    };

    let fixture = TestBed.createComponent(ParralaxHeaderDirective);
    let renderer2 = fixture.componentRef.injector.get<Renderer2>(Renderer2);

    let domCtrl = new DomController();

    const directive = new ParralaxHeaderDirective(elRefMock, renderer2, domCtrl);
    expect(directive).toBeTruthy();
  });
});

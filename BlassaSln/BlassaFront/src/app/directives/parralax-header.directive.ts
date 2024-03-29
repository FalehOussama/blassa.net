import { Directive , ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { DomController } from '@ionic/angular';

@Directive({
  selector: '[appParralaxHeader]',
  host: {
		'(ionScroll)': 'onContentScroll($event)'
	}
})
export class ParralaxHeaderDirective {

	@Input('parallaxHeader') imagePath: string;
	@Input('parallaxHeight') parallaxHeight: number;

	private headerHeight: number;
	private header: HTMLDivElement;
  	private mainContent: HTMLDivElement;

  constructor(
    public element: ElementRef , public renderer : Renderer2 , private domCtrl : DomController
  ) { }

  ngAfterViewInit(){

		this.headerHeight = this.parallaxHeight;
    	this.mainContent = this.element?.nativeElement?.querySelector('.main-content');

		
			this.domCtrl.write(() => {

				this.header = this.renderer.createElement('div');
	
				this.renderer.insertBefore(this.element?.nativeElement, this.header, this.element?.nativeElement?.firstChild);
	
				this.renderer.setStyle(this.header, 'background-image', 'url(' + this.imagePath + ')');
				this.renderer.setStyle(this.header, 'height', this.headerHeight + 'px');
				this.renderer.setStyle(this.header, 'background-size', 'cover');
	
			});
		


  	}

    onContentScroll(ev){

	    this.domCtrl?.read(() => {

	      let translateAmt, scaleAmt;

	      // Already scrolled past the point at which the header image is visible
	      if(ev.detail.scrollTop > this.parallaxHeight){
	      }

	      if(ev.detail?.scrollTop >= 0){
	          translateAmt = -(ev.detail?.scrollTop / 3);
	          scaleAmt = 1;
	      } else {
	          translateAmt = 10;
	          scaleAmt = -ev.detail?.scrollTop / this.headerHeight + 2;
	      }

	      this.domCtrl?.write(() => {
	        this.renderer.setStyle(this.header, 'transform', 'translate3d(0,'+translateAmt+'px,0) scale('+scaleAmt+','+scaleAmt+')');
	        this.renderer.setStyle(this.mainContent, 'transform', 'translate3d(0, '+(-ev.detail.scrollTop) + 'px, 0');
	      });

	    });

	}
}


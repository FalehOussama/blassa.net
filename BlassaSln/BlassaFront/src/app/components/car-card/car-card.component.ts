import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-card',
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.scss'],
})
export class CarCardComponent  implements OnInit {

  constructor(    private router : Router,) { }

  ngOnInit() {}

  @Input() car1:any;
  @Input() car2:any;
  @Input() car3:any;

  carPage(i){
    this.router.navigate(['/car-info', i]);
  }

}

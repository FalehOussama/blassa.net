import { Component, OnInit } from '@angular/core';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';

@Component({
  selector: 'app-info-conducteur',
  templateUrl: './info-conducteur.component.html',
  styleUrls: ['./info-conducteur.component.scss'],
})
export class InfoConducteurComponent  implements OnInit {

  constructor(
    private callNumber: CallNumber
  ) { }

  ngOnInit() {}

  
  call(){
    this.callNumber.callNumber("55119595", true)
  .then(res => console.log('Launched dialer!', res))
  .catch(err => console.log('Error launching dialer', err));

  }

  whatsapp(){
    window.location.replace("https://api.whatsapp.com/send?phone=21655119595");
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { RechTrajetAnnonceDto } from '../../classes/rechTrajetAnnonceDto';
import { VoyageAvecType } from '../../classes/voyageAvecType';

@Component({
  selector: 'app-annonce-item',
  templateUrl: './annonce-item.component.html',
  styleUrls: ['./annonce-item.component.scss'],
})
export class AnnonceItemComponent  implements OnInit {

  constructor( ) {
    
  }

  @Input() annonce: RechTrajetAnnonceDto;
  style:string;
  
  ngOnInit() {
    if (this.annonce.voyageAvec == VoyageAvecType.FILLES){
      this.style="filles";
     }
    else if (this.annonce.voyageAvec == VoyageAvecType.GARCONS){
      this.style="garcons";
     }else{
      this.style="tous"
     }
  }

  
}

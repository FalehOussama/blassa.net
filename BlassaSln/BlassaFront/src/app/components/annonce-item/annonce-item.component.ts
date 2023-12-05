import { Component, Input, OnInit } from '@angular/core';
import { RechTrajetAnnonceDto } from '../../classes/rechTrajetAnnonceDto';
import { VoyageAvecType } from '../../classes/voyageAvecType';
import { ReservationStatusType } from '../../classes/reservationStatusType';

@Component({
  selector: 'app-annonce-item',
  templateUrl: './annonce-item.component.html',
  styleUrls: ['./annonce-item.component.scss'],
})
export class AnnonceItemComponent  implements OnInit {

  constructor( ) {
    
  }

  @Input() annonce: RechTrajetAnnonceDto;
  style: string;
  classResChip: String = "";
  
  ngOnInit() {
    if (this.annonce.voyageAvec == VoyageAvecType.FILLES){
      this.style="filles";
     }
    else if (this.annonce.voyageAvec == VoyageAvecType.GARCONS){
      this.style="garcons";
     }else{
      this.style="tous"
    }

    if (this.annonce.statutRes == ReservationStatusType.COMFIRMEE) this.classResChip = "confirmee"
    else if (this.annonce.statutRes == ReservationStatusType.EN_ATTENTE) this.classResChip = "enAttente"
    else if (this.annonce.statutRes == ReservationStatusType.REFUSEE) this.classResChip = "refusee"
  }

  
}

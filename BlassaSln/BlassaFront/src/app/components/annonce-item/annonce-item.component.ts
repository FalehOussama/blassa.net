import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { VoyageAvecType } from '../../classes/voyageAvecType';

@Component({
  selector: 'app-annonce-item',
  templateUrl: './annonce-item.component.html',
  styleUrls: ['./annonce-item.component.scss'],
})
export class AnnonceItemComponent  implements OnInit {

  constructor(
    private userService : UserService, 
  ) {
    
  }
  user:any;
  months : any[] = ["Jan" , "Fev" , "Mar" , "Avr" , "Mai" , "Juin" , "Jui" , "Aout" , "Sep" , "Oct" , "Nov" , "Dec"]
  style:string;



  ngOnInit() {
    if (this.voyageAvec == VoyageAvecType.FILLES){
      this.style="filles";
     }
    else if (this.voyageAvec == VoyageAvecType.GARCONS){
      this.style="garcons";
     }else{
      this.style="tous"
     }
  }


  @Input() id: number;
  @Input() userId: number;
  @Input() prix: number;
  @Input() depart: string;
  @Input() destination: string;
  @Input() uImgUrl: string;
  @Input() nombrePlaces: number[];
  @Input() nombrePlacesDispo: number[];
  @Input() uPrenom: string;
  @Input() instantane: boolean;
  @Input() vClimatise: boolean;
  @Input() cigarette: boolean;
  @Input() animaux: boolean;
  @Input() max2: boolean;
  @Input() leger: boolean;
  @Input() moyen: boolean;
  @Input() lourd: boolean;
  @Input() uVerifie: boolean;
  @Input() uSuperDriver: boolean;
  @Input() uSuperUser: boolean;
  @Input() voyageAvec: number;
  @Input() dateHeureDepart:any;


  @Input() current: number;



}

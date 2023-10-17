import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

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
     if(this.filles){
      this.style="filles";
     }
     else if(this.garcons){
      this.style="garcons";
     }else{
      this.style="tous"
     }
  }


  @Input() idUser: number;
  @Input() prix: number;
  @Input() Dep: string;
  @Input() Des: string;
  @Input() IMG: string;
  @Input() NBP: number[];
  @Input() Nom: string;
  @Input() inst: boolean;
  @Input() verifie: any;
  @Input() filles: any;
  @Input() garcons: any;
  @Input() tous: any;
  @Input() dateHeure:any;


  @Input() current: number;



}

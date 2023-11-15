import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnnonceService } from 'src/app/services/annonce.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-mes-reservations',
  templateUrl: './mes-reservations.page.html',
  styleUrls: ['./mes-reservations.page.scss'],
})
export class MesReservationsPage implements OnInit {

  constructor(
    private reservationService : ReservationService,
    private storage : StorageService,
    private annonceService : AnnonceService,
    private router : Router,
  ) {
    this.storage.get('user').then(
      async data => {
        while(this.user==undefined){
          this.user = await data;
        }
      }
    )
  }

  mesReservations : any;
  mesReservationsHistorique : any;
  
  user:any;
  nbreReservation:number;

  ngOnInit() {
  }

  async chargerHistoriqueReservations(){
    //await this.reservationService.getHistoriqueMesReservations(this.user?.id_User).subscribe(
    //  async (res)=> this.mesReservationsHistorique = await res
    //)
  }

  async ionViewWillEnter(){

    this.user = await this.storage.get('user');

    await this.reservationService.getMesReservations(this.user?.id_User).subscribe(
      async (res)=>
      {
        this.mesReservations = await res
        this.nbreReservation = this.mesReservations.length
        console.log(this.mesReservations)
      } 
    )
  }

  afficherFiche(id){
    this.storage.set('idTrajetAnnonce', id);
    this.router.navigate(['/fiche-trajet']);
  }
}

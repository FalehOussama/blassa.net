import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnnonceService } from 'src/app/services/annonce.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { StorageService } from 'src/app/services/storage.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-mes-trajets',
  templateUrl: './mes-trajets.page.html',
  styleUrls: ['./mes-trajets.page.scss'],
})
export class MesTrajetsPage implements OnInit {

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

  mesAnnonces : any;
  mesAnnoncesHistorique : any;
  user:any;
  nbreAnnonces:number;

  async chargerHistoriqueAnnonces(){
    //await this.reservationService.getHistoriqueMesAnnonces(this.user?.id_User).subscribe(
    //  async (res)=> this.mesAnnoncesHistorique = await res
    //)
  }

  async ionViewWillEnter(){

    this.user = await this.storage.get('user');

    await this.reservationService.getMesAnnonces(this.user?.id_User).subscribe(
      async (res)=> {
        this.mesAnnonces = await res
        this.nbreAnnonces = this.mesAnnonces.length
        console.log(this.mesAnnonces)
      }

    )
  }

  async ngOnInit() {}

  afficherFiche(id){
    this.storage.set('idTrajetAnnonce', id);
    this.router.navigate(['/fiche-trajet']);
  }

}

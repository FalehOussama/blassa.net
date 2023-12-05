import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnnonceService } from 'src/app/services/annonce.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-mes-reservations',
  templateUrl: './mes-reservations.page.html',
  styleUrls: ['./mes-reservations.page.scss'],
})
export class MesReservationsPage implements OnInit {

  constructor(
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

  ngOnInit() {
  }

  async ionViewWillEnter(){

    this.user = await this.storage.get('user');

    await this.annonceService.getMesTrajetsResByUserId(this.user?.id).subscribe(
      async (res) => {
        this.mesReservations = await res;
      }
    );

    await this.annonceService.getMesTrajetsResHisByUserId(this.user?.id).subscribe(
      async (res) => this.mesReservationsHistorique = await res
    );
  }

  afficherFiche(id){
    this.storage.set('idTrajetAnnonce', id);
    this.router.navigate(['/fiche-trajet']);
  }
}

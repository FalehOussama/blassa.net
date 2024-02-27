import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnnonceService } from 'src/app/services/annonce.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-mes-trajets',
  templateUrl: './mes-trajets.page.html',
  styleUrls: ['./mes-trajets.page.scss'],
})
export class MesTrajetsPage implements OnInit {

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

  mesAnnonces : any;
  mesAnnoncesHistorique : any;
  user:any;

  async ionViewWillEnter(){

    this.user = await this.storage.get('user');

    await this.annonceService.getMesTrajetsByUserId(this.user?.id).subscribe(
      async (res) => this.mesAnnonces = await res
    );

    await this.annonceService.getMesTrajetsHisByUserId(this.user?.id).subscribe(
      async (res) => this.mesAnnoncesHistorique = await res
    );
  }

  async ngOnInit() {}

  afficherFiche(id){
    this.storage.set('idTrajetAnnonce', id);
    this.router.navigate(['/fiche-trajet/' + id]);
  }

}

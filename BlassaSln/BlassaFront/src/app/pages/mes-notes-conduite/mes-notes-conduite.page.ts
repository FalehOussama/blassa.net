import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { AviConducteurService } from '../../services/aviConducteur.service';
import { AvisCondComponent } from '../../components/avis-cond/avis-cond.component';

enum COLORS {
  GREY = "#E0E0E0",
  GREEN = "#76FF03",
  YELLOW = "#FFCA28",
  RED = "#DD2C00"
}

@Component({
  selector: 'app-mes-notes-conduite',
  templateUrl: './mes-notes-conduite.page.html',
  styleUrls: ['./mes-notes-conduite.page.scss'],
})
export class MesNotesConduitePage implements OnInit {

  @ViewChild(AvisCondComponent) compAvisCond: AvisCondComponent;

  user: any;
  retourAvis: any;
  textesAvi: string[] = ['Très décevant', 'Décevant', 'Correct', 'Bien', 'Excellent'];
  public count = 0;
  public itemsPerPage = 10;
  public currentPage = 1;

  constructor(private router: Router,
    private aviCondService: AviConducteurService,
    private storage: StorageService) { }

  ionViewWillEnter() {
    this.storage.get('user').then(
      async (data) => {
        this.user = await data;
        this.compAvisCond.userId = this.user.id;
        this.compAvisCond.ngOnInit();
        this.loadAvisCond();
      }
    );
  }

  ngOnInit() {
  }

  loadAvisCond() {
    this.aviCondService.getByUserIdPaginate(this.user.id, this.currentPage).subscribe(
      async (res) => {
        this.retourAvis = await res;
        this.count = this.retourAvis.nbreTotal;
      }
    );
  }

  //pagination
  public onChange(event): void {
    console.dir(event);
    this.currentPage = event;
    this.loadAvisCond();
  }

  getTexteAvi(cat: number) {
    return this.textesAvi[cat];
  }

  getColorAvis(cat: number, index: number) {
    if (index > cat + 1) {
      return COLORS.GREY;
    }
    switch (cat + 1) {
      case 1:
      case 2:
        return COLORS.RED;
      case 3:
        return COLORS.YELLOW;
      case 4:
      case 5:
        return COLORS.GREEN;
      default:
        return COLORS.GREY;
    }
  }

  toFiche(idMembre) {
    this.storage.set('idMembre', idMembre);
    this.router.navigate(['/profil-membre']);
  }

}

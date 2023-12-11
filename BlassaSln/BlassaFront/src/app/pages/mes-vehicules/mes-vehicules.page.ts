import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { VehiculeService } from '../../services/vehicule.service';

@Component({
  selector: 'app-mes-vehicules',
  templateUrl: './mes-vehicules.page.html',
  styleUrls: ['./mes-vehicules.page.scss'],
})
export class MesVehiculesPage implements OnInit {

  user: any;
  vehicules: any;
  styleColors: string[] = [
    "black",
    "white",
    "gray",
    "lightgray",
    "purple", //BORDEAUX
    "red",
    "darkblue",
    "blue",
    "darkgreen",
    "green",
    "maroon",
    "beige",
    "orange",
    "yellow",
    "blueviolet",
    "hotpink"];

  typeVehicules: string[] = [
    "COMPACTE",
    "BERLINE",
    "CABRIOLE",
    "BREAK",
    "SUV",
    "MONOSPACE"];

  constructor(
    private router: Router,
    private vehiculeService: VehiculeService,
    private storage: StorageService)
  { }

  ionViewWillEnter() {
    this.storage.get('user').then(
      async (data) => {
        this.user = await data;

        this.vehiculeService.getByUserId(this.user.id).subscribe(
          async (res) => {
            this.vehicules = await res;
          }
        );
      }
    );
  }

  ngOnInit() { }

  toFiche(idVehicule) {
    this.storage.set('idVehicule', idVehicule);
    this.router.navigate(['/mes-vehicules-fiche']);
  }

  getStyleColor(index: number) {
    return this.styleColors ? "color-" + this.styleColors[index] : '';
  }

  getTypeVehicule(index: number) {
    return this.typeVehicules ? this.typeVehicules[index] : '';
  }
}

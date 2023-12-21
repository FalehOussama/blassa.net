import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { VehiculeService } from '../../services/vehicule.service';
import { Vehicule } from '../../classes/vehicule';
import { Base64 } from 'js-base64';

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
            for (let i = 0; i < this.vehicules.length; i++) {
              this.setImageVehicule(this.vehicules[i]);
            }
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

  async setImageVehicule(car: Vehicule) {
    if (car.image1) {
       this.writeFile(car.image1, car, this.onWFileImageLoaded);
    }
  }

  onWFileImageLoaded(hRef: string, ext: string) {
  }

  writeFile(fileStr: string, car: Vehicule, onLoad: (hRef: string, ext: string) => void) {
    const boundOnLoad = onLoad.bind(this);

    let fileType = this.detectMimeType(fileStr);
    let ext = this.detectExtension(fileStr);

    let uint8Array = Base64.toUint8Array(fileStr);
    let arrayBuffer = uint8Array.buffer;
    const dataView = new DataView(arrayBuffer);
    const blob = new Blob([dataView], { type: fileType });

    const reader = new FileReader();

    reader.onload = function () {
      let hRef: string = <string>reader.result;
      car.image1Href = hRef;
      if (boundOnLoad)
        boundOnLoad(hRef, ext);
    };

    reader.onerror = function () {
      console.log(reader.error);
    };

    reader.readAsDataURL(blob);
  }

  detectMimeType(base64String: string) {
    const signatures = {
      JVBERi0: "application/pdf",
      R0lGODdh: "image/gif",
      R0lGODlh: "image/gif",
      iVBORw0KGgo: "image/png",
      TU0AK: "image/tiff",
      "/9j/": "image/jpg",
      UEs: "application/vnd.openxmlformats-officedocument.", //?? doc - docx - ppt - xls
      PK: "application/zip",
    };

    for (let s in signatures) {
      if (base64String.indexOf(s) === 0) {
        let x = signatures[s];

        // return
        return x;
      }
    }
    return '';

  }

  detectExtension(base64String: string) {
    const extSign = {
      JVBERi0: ".pdf",
      R0lGODdh: ".gif",
      R0lGODlh: ".gif",
      iVBORw0KGgo: ".png",
      TU0AK: ".tiff",
      "/9j/": ".jpg",
      UEs: ".docx", //?? doc - docx - ppt - xls
      PK: ".zip",
    };

    for (let s in extSign) {
      if (base64String.indexOf(s) === 0) {
        let ext = extSign[s];

        // return
        return ext;
      }
    }
    return '';
  }

}

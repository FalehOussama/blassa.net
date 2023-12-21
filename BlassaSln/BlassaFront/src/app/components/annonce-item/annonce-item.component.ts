import { Component, Input, OnInit } from '@angular/core';
import { RechTrajetAnnonceDto } from '../../classes/rechTrajetAnnonceDto';
import { VoyageAvecType } from '../../classes/voyageAvecType';
import { ReservationStatusType } from '../../classes/reservationStatusType';
import { Base64 } from 'js-base64';

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
  
  ngOnInit() {
    if (this.annonce.voyageAvec == VoyageAvecType.FILLES){
      this.style="filles";
     }
    else if (this.annonce.voyageAvec == VoyageAvecType.GARCONS){
      this.style="garcons";
     }else{
      this.style="tous"
    }

    this.setImageVehicule();

    if (this.annonce.statutRes == ReservationStatusType.COMFIRMEE) this.classResChip = "confirmee";
    else if (this.annonce.statutRes == ReservationStatusType.EN_ATTENTE) this.classResChip = "enAttente";
    else if (this.annonce.statutRes == ReservationStatusType.REFUSEE) this.classResChip = "refusee";
  }

  getStyleColor(index: number) {
    return this.styleColors ? "color-" + this.styleColors[index] : '';
  }

  getTypeVehicule(index: number) {
    return this.typeVehicules ? this.typeVehicules[index] : '';
  }

  async setImageVehicule() {
    if (this.annonce.vImage1) {
      this.writeFile(this.annonce.vImage1, this.onWFileImageLoaded);
    }
  }

  onWFileImageLoaded(hRef: string, ext: string) {
    this.annonce.vImage1Href = hRef;
  }

  writeFile(fileStr: string, onLoad: (hRef: string, ext: string) => void) {
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

import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { VehiculeService } from '../../services/vehicule.service';
import { Vehicule } from '../../classes/vehicule';
import { BlassaAlertComponent } from '../../components/blassa-alert/blassa-alert.component';
import { Base64 } from 'js-base64';

@Component({
  selector: 'app-mes-vehicules-fiche',
  templateUrl: './mes-vehicules-fiche.page.html',
  styleUrls: ['./mes-vehicules-fiche.page.scss'],
})
export class MesVehiculesFichePage implements OnInit {

  @ViewChild(NgForm, { static: false }) vehiculeForm: NgForm;
  user: any;
  idVehicule: any;
  vehicule: Vehicule = new Vehicule();
  isEdit: boolean = false;
  typeVehicules: string[] = [
    "COMPACTE",
    "BERLINE",
    "CABRIOLE",
    "BREAK",
    "SUV",
    "MONOSPACE"];
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
  couleurs: string[] = [
    "Noir",
    "Blanc",
    "Gris fonçé",
    "Gris",
    "Bordeaux", //BORDEAUX
    "Rouge",
    "Bleu fonçé",
    "Bleu",
    "Vert fonçé",
    "Vert",
    "Maron",
    "Beige",
    "Orange",
    "Jaune",
    "Violet",
    "Rose"];

  constructor(
    private router: Router,
    private vehiculeService: VehiculeService,
    private storage: StorageService,
    private blassaAlert: BlassaAlertComponent)
  { }

  ionViewWillEnter() {

    this.storage.get('user').then(
      async (data) => {
        this.user = await data;
      }
    );

    this.storage.get('idVehicule').then(
      async (data) => {
        this.idVehicule = await data;

        this.vehiculeService.getById(this.idVehicule).subscribe(
          async (res) => {
            this.vehicule = await res;
            this.isEdit = true;
            this.fileCarteGriseProces();
            this.fFileAssuranceProces();
            this.fileVisiteTechProces();
            this.fileImage1Proces();
            this.fileImage2Proces();
          },
          async (error) => {
            this.vehicule = new Vehicule();
            this.vehicule.userId = this.user.id;
            this.vehicule.climatise = false;
            this.vehicule.typeVehicule = 1;
            this.vehicule.couleur = 0;
          }
        );
      }
    );

  }

  ngOnInit() { }

  typeVehiculeChange(ev) {
    this.vehicule.typeVehicule = parseInt(ev.target.value);
  }

  couleurChange(index) {
    this.vehicule.couleur = index;
  }

  getNameIconColor(index) {
    return this.vehicule.couleur == index ? "checkmark-circle" : "ellipse";
  }

  enregistrerClick() {
    if (this.vehiculeForm?.valid) {
      if (!this.isEdit) {
        this.vehiculeService.post(this.vehicule).subscribe(
          async (resV: Vehicule) => {
            this.blassaAlert.alertDismiss("Ajout de votre véhicule",
              "Votre véhicule a été enregistré avec succès",
              this.navigateToList.bind(this));
          },
          async (err) => {
            this.blassaAlert.alert("Erreur lors de l'ajout de votre véhicule", err.error);
          }
        );
      }
      else {
        this.vehiculeService.put(this.vehicule).subscribe(
          async (resV: Vehicule) => {
            this.blassaAlert.alertDismiss("Modification de votre véhicule",
              "Votre véhicule a été enregistré avec succès",
              this.navigateToList.bind(this));
          },
          async (err) => {
            this.blassaAlert.alert("Erreur lors de la modification de votre véhicule", err.error);
          }
        );
      }
    }
  }

  async navigateToList(data) {
    this.router.navigateByUrl('/mes-vehicules');
  }

  supprimerClick() {
    if (this.isEdit) {
      this.blassaAlert.confirm("Suppression de votre véhicule", "La suppression de votre véhicule est irréversible, vous confirmer ?", this.supprimerConfirm.bind(this))
    }
  }

  supprimerConfirm() {
    this.vehiculeService.delete(this.vehicule.id).subscribe(
      async (resV: Vehicule) => {
        this.blassaAlert.alertDismiss("Suppression de votre véhicule",
          "Votre véhicule a été supprimé avec succès",
          this.navigateToList.bind(this));
      },
      async (err) => {
        this.blassaAlert.alert("Erreur lors de la suppression de votre véhicule", err.error);
      }
    );
  }

  /*****************************************/
  
  onFileImagesChange(fileChangeEvent) {
    for (let i = 0; i < fileChangeEvent.target.files.length; i++) {
      let value = fileChangeEvent.target.files[i];
      if (!this.vehicule.image1 || !this.vehicule.image2 || !this.vehicule.image3)
        this.readFile(value, this.onFileImagesLoaded);
    }  
  }

  onFileImagesLoaded(fileBtoa: string) {
    if (!this.vehicule.image1) {
      this.vehicule.image1 = fileBtoa;
      this.fileImage1Proces();
    }
    else if (!this.vehicule.image2) {
      this.vehicule.image2 = fileBtoa;
      this.fileImage2Proces();
    }
      
  }

  public fileImage1Obj: any;
  fileImage1Proces() {
    this.fileImage1Obj = null;
    if (!this.vehicule.image1)
      return;

    this.writeFile(this.vehicule.image1, this.onWFileImage1Loaded);
  }

  onWFileImage1Loaded(hRef: string, ext: string) {
    this.fileImage1Obj = { href: hRef, ext: ext };;
  }

  public fileImage2Obj: any;
  fileImage2Proces() {
    this.fileImage2Obj = null;
    if (!this.vehicule.image2)
      return;

    this.writeFile(this.vehicule.image2, this.onWFileImage2Loaded);
  }

  onWFileImage2Loaded(hRef: string, ext: string) {
    this.fileImage2Obj = { href: hRef, ext: ext };;
  }

  deleteImage1() {
    this.fileImage1Obj = null;
    this.vehicule.image1 = "";
  }

  deleteImage2() {
    this.fileImage2Obj = null;
    this.vehicule.image2 = "";
  }
  /*****************************************/

  onFileCarteGriseChange(fileChangeEvent) {
    let file = fileChangeEvent.target.files[0];
    this.readFile(file, this.onFileCarteGriseLoaded);
  }

  onFileCarteGriseLoaded(fileBtoa: string) {
    this.vehicule.fileCarteGrise = fileBtoa;
  }

  onFileAssuranceChange(fileChangeEvent) {
    let file = fileChangeEvent.target.files[0];
    this.readFile(file, this.onFileAssuranceLoaded);
  }

  onFileAssuranceLoaded(fileBtoa: string) {
    this.vehicule.fileAssurance = fileBtoa;
  }

  onFileVisiteTechChange(fileChangeEvent) {
    let file = fileChangeEvent.target.files[0];
    this.readFile(file, this.onFileVisiteTechLoaded);
  }

  onFileVisiteTechLoaded(fileBtoa: string) {
    this.vehicule.fileVisiteTech = fileBtoa;
  }

  /*****************************************/

  public fileCarteGriseObj: any;
  fileCarteGriseProces() {
    this.fileCarteGriseObj = null;
    if (!this.vehicule.fileCarteGrise)
      return;

    this.writeFile(this.vehicule.fileCarteGrise, this.onWFileCarteGriseLoaded);
  }

  onWFileCarteGriseLoaded(hRef: string, ext: string) {
    this.fileCarteGriseObj = { href: hRef, ext: ext };;
  }

  deleteCarteGrise() {
    this.fileCarteGriseObj = null;
    this.vehicule.fileCarteGrise = "";
    this.blassaAlert.alert('Suppression carte grise', 'Veuillez enregistrer pour que la suppression soit effective.');
  }

  /*****************************************/

  public fileAssuranceObj: any;
  fFileAssuranceProces() {
    this.fileAssuranceObj = null;
    if (!this.vehicule.fileAssurance)
      return;

    this.writeFile(this.vehicule.fileAssurance, this.onWFileAssuranceLoaded);
  }

  onWFileAssuranceLoaded(hRef: string, ext: string) {
    this.fileAssuranceObj = { href: hRef, ext: ext };;
  }

  deleteAssurance() {
    this.fileAssuranceObj = null;
    this.vehicule.fileAssurance = "";
    this.blassaAlert.alert('Suppression assurance', 'Veuillez enregistrer pour que la suppression soit effective.');
  }

  /*****************************************/

  public fileVisiteTechObj: any;
  fileVisiteTechProces() {
    this.fileVisiteTechObj = null;
    if (!this.vehicule.fileVisiteTech)
      return;

    this.writeFile(this.vehicule.fileVisiteTech, this.onWFileVisiteTechLoaded);
  }

  onWFileVisiteTechLoaded(hRef: string, ext: string) {
    this.fileVisiteTechObj = { href: hRef, ext: ext };;
  }

  deleteVisiteTech() {
    this.fileVisiteTechObj = null;
    this.vehicule.fileVisiteTech = "";
    this.blassaAlert.alert('Suppression attestation visite technique', 'Veuillez enregistrer pour que la suppression soit effective.');
  }

  /*****************************************/

  readFile(file, onLoad: (fileBtoa: string) => void) {
    const boundOnLoad = onLoad.bind(this);
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    reader.onload = function () {
      let arrayBuffer = <ArrayBuffer>reader.result;
      let uint8Array = new Uint8Array(arrayBuffer);

      let b64encoded = Base64.fromUint8Array(uint8Array);
      boundOnLoad(b64encoded);
    };

    reader.onerror = function () {
      console.log(reader.error);
    };

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

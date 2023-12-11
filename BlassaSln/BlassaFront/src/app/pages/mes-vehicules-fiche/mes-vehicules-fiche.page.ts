import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { VehiculeService } from '../../services/vehicule.service';
import { Vehicule } from '../../classes/vehicule';
import { BlassaAlertComponent } from '../../components/blassa-alert/blassa-alert.component';

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

}

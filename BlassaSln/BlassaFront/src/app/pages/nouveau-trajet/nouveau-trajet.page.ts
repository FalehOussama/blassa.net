/// <reference types="@types/googlemaps" />
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgZone } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AnnonceService } from 'src/app/services/annonce.service';
import { UserService } from 'src/app/services/user.service';
import { VehiculeService } from '../../services/vehicule.service';
import { LocationService } from 'src/app/services/location.service';
import { StorageService } from 'src/app/services/storage.service';
import { TrajetAnnonce } from '../../classes/trajetAnnonce';
import { Vehicule } from '../../classes/vehicule';
import { BlassaAlertComponent } from '../../components/blassa-alert/blassa-alert.component';

@Component({
  selector: 'app-nouveau-trajet',
  templateUrl: './nouveau-trajet.page.html',
  styleUrls: ['./nouveau-trajet.page.scss'],
})
export class NouveauTrajetPage implements OnInit  {

  @Input() marque: any;

  /************************** */
  user: any;
  trajetAnnonce: TrajetAnnonce = new TrajetAnnonce();
  idTrajetAnnonce: any;
  vehicules: any;
  vehiculeSelect: any;
  vehiculeSelectId: any;
  newVehicule: Vehicule = new Vehicule();
  autoCompleteMarques: any[];
  autoCompleteModels: any[];
  carModels: any[];
  today: String = this.toIsoString(new Date());
  etape: number;
  prixMoyen: number;
  /************************** */

  static lonDep: any;
  static latDep: any;
  static lonDes: any;
  static latDes: any;
  
  constructor(
    public zone: NgZone,
    private router : Router,
    private annonceService : AnnonceService,
    private userService: UserService,
    private vehiculeService: VehiculeService,
    private locationService: LocationService,
    private storage : StorageService,
    private blassaAlert: BlassaAlertComponent
  ) {
    //this.GoogleAutocompleteDep = new google.maps.places.AutocompleteService();
    //this.autocompleteDep = { input: '' };
    this.autocompleteItemsDep = [];

    //this.GoogleAutocompleteDes = new google.maps.places.AutocompleteService();
    //this.autocompleteDes = { input: '' };
    this.autocompleteItemsDes = [];

    this.autoCompleteMarques = [];
    this.autoCompleteModels = [];
    this.carModels = [];
  }

  async ionViewWillEnter(){
    await this.storage.get('user').then(
      async (data) => {
        let userStorage = await data;
        this.trajetAnnonce.userId = userStorage.id;

        this.userService.getUserById(userStorage.id).subscribe(
          async (res) => {
            this.user = await res;
            await this.storage.set('user', this.user);

            this.trajetAnnonce.tel = this.user.preferences.tel;
            this.trajetAnnonce.whatsApp = this.user.preferences.whatsApp;
            this.trajetAnnonce.messenger = this.user.preferences.messenger;
            this.trajetAnnonce.voyageAvec = this.user.preferences.voyageAvec;
            this.trajetAnnonce.voyageAvecStr = this.user.preferences.voyageAvec.toString();
            this.trajetAnnonce.cigarette = this.user.preferences.cigarette;
            this.trajetAnnonce.animaux = this.user.preferences.animaux;
            this.trajetAnnonce.max2 = this.user.preferences.max2;
            this.trajetAnnonce.leger = this.user.preferences.leger;
            this.trajetAnnonce.moyen = this.user.preferences.moyen;
            this.trajetAnnonce.lourd = this.user.preferences.lourd
            this.trajetAnnonce.instantane = this.user.preferences.instantane;
            this.trajetAnnonce.verifies = this.user.preferences.verifies;
          }
        );

        this.vehiculeService.getByUserId(userStorage.id).subscribe(
          async (res) => {
            this.vehicules = await res;
            if (this.vehicules.length > 0) {
              this.vehiculeSelect = this.vehicules[0];
              this.vehiculeSelectId = this.vehiculeSelect?.id;
              this.trajetAnnonce.vClimatise = this.vehiculeSelect.climatise;
            }
            else {
              this.vehiculeSelect = undefined;
              this.vehiculeSelectId = undefined;
            }
          }
        );
      }
    );

    this.trajetAnnonce.dateHeureDepart = new Date();
    this.trajetAnnonce.dateHeureDepartStr = this.toIsoString(this.trajetAnnonce.dateHeureDepart);
    this.trajetAnnonce.nombrePlaces = 3;
    this.trajetAnnonce.prix = 5;
    this.etape = 1;
    this.ngOnInit();
  }
  
  ngOnInit() {  }

  toEtape4() {
    this.etape = 4;
  }

  toEtape3() {
    this.etape = 3;
    if (this.vehiculeSelect) {
      this.trajetAnnonce.VehiculeId = this.vehiculeSelect.id;
    }
    else {
      this.newVehicule.userId = this.user.id;
      this.newVehicule.couleur = 0;
      this.newVehicule.typeVehicule = 0;
      this.newVehicule.verifie = false;
      this.newVehicule.miseEnCirculation = new Date();
    }
  }

  toEtape2() {
    this.etape = 2;
    this.trajetAnnonce.dateHeureDepart = new Date(this.trajetAnnonce.dateHeureDepartStr);
    this.vehiculeSelectId = this.vehiculeSelect?.id;
  }

  toEtape1() {
    this.etape = 1;
  }

  toggleTel() {
    this.trajetAnnonce.tel = !this.trajetAnnonce.tel;
  }

  toggleWhatsApp() {
    this.trajetAnnonce.whatsApp = !this.trajetAnnonce.whatsApp;
  }

  toggleMessenger() {
    this.trajetAnnonce.messenger = !this.trajetAnnonce.messenger;
  }

  toIsoString(date) {
    var tzo = -date.getTimezoneOffset(),
      dif = tzo >= 0 ? '+' : '-',
      pad = function (num) {
        return (num < 10 ? '0' : '') + num;
      };

    return date.getFullYear() +
      '-' + pad(date.getMonth() + 1) +
      '-' + pad(date.getDate()) +
      'T' + pad(date.getHours()) +
      ':' + pad(date.getMinutes()) +
      ':' + pad(date.getSeconds()) +
      dif + pad(Math.floor(Math.abs(tzo) / 60)) +
      ':' + pad(Math.abs(tzo) % 60);
  }

  selectVehicule(id) {
    this.vehiculeSelect = this.vehicules.find((obj) => {
      return obj.id === id;
    });
    this.trajetAnnonce.vClimatise = this.vehiculeSelect.climatise;
  }

  plusPa() {
    if (this.trajetAnnonce.nombrePlaces < 8) { this.trajetAnnonce.nombrePlaces++; }
  }

  minusPa() {
    if (this.trajetAnnonce.nombrePlaces > 1) { this.trajetAnnonce.nombrePlaces--; }
  }

  plusPrix() {
    if (this.trajetAnnonce.prix < 999) { this.trajetAnnonce.prix++; }
  }

  minusPrix() {
    if (this.trajetAnnonce.prix > 0) { this.trajetAnnonce.prix--; }
  }
  
  autocompleteDep: { input: string; };
  autocompleteItemsDep: any[];
  GoogleAutocompleteDep: any;

  autocompleteDes: { input: string; };
  autocompleteItemsDes: any[];
  GoogleAutocompleteDes: any;
  placeid: any;
  
  getLatLngFromAddressDep(place_Id : any){
    //var geocoder = new google.maps.Geocoder();  
    //geocoder.geocode( { 'placeId': place_Id}, function(results, status) {
  
    //  if (status == google.maps.GeocoderStatus.OK) {
    //    NouveauTrajetPage.latDep=results[0].geometry.location.lat();
    //    NouveauTrajetPage.lonDep=results[0].geometry.location.lng();
    //  } else {
    //    console.log("Geocode was not successful for the following reason: " + status);
    //  }
    //});
  }

  SelectSearchResultDep(item) {
    ///WE CAN CONFIGURE MORE COMPLEX FUNCTIONS SUCH AS UPLOAD DATA TO FIRESTORE OR LINK IT TO SOMETHING
    // alert(JSON.stringify(item))
    //this.placeid = item.place_id
    //this.depart= item.description
    //this.autocompleteItemsDep = [];
    //this.getLatLngFromAddressDep(this.placeid);
    this.trajetAnnonce.depart = item.city;
    this.autocompleteItemsDep = [];
    this.getPrixMoyen();
  }

  UpdateSearchResultsDep() {
    this.autocompleteItemsDep = [];

    if (this.trajetAnnonce.depart.length < 2) {
      return;
    }

    this.locationService.get(this.trajetAnnonce.depart).subscribe(
      async (res) => {
        this.autocompleteItemsDep = res;
      }
    );
    this.getPrixMoyen();
  }

  getLatLngFromAddressDes(place_Id : any){
    //var geocoder = new google.maps.Geocoder();  
    //geocoder.geocode( { 'placeId': place_Id}, function(results, status) {
  
    //  if (status == google.maps.GeocoderStatus.OK) {
    //    NouveauTrajetPage.latDes=results[0].geometry.location.lat();
    //    NouveauTrajetPage.lonDes=results[0].geometry.location.lng();
    //  } else {
    //    console.log("Geocode was not successful for the following reason: " + status);
    //  }
    //});
  }

  SelectSearchResultDes(item) {
    ///WE CAN CONFIGURE MORE COMPLEX FUNCTIONS SUCH AS UPLOAD DATA TO FIRESTORE OR LINK IT TO SOMETHING
    // alert(JSON.stringify(item))
    //this.placeid = item.place_id
    //this.destination= item.description
    //this.autocompleteItemsDes = [];

    //this.getLatLngFromAddressDes(this.placeid);

    this.trajetAnnonce.destination = item.city;
    this.autocompleteItemsDes = [];
    this.getPrixMoyen();
  }
  
  UpdateSearchResultsDes(){
    this.autocompleteItemsDep = [];

    if (this.trajetAnnonce.destination.length < 2) {
      return;
    }

    this.locationService.get(this.trajetAnnonce.destination).subscribe(
      async (res) => {
        this.autocompleteItemsDes = res;
      }
    );
    this.getPrixMoyen();
  }

  getPrixMoyen() {
    this.prixMoyen = 0;
    if (!this.trajetAnnonce.depart || !this.trajetAnnonce.destination)
      return;

    this.annonceService.getPrixMoyen(this.trajetAnnonce.depart, this.trajetAnnonce.destination).subscribe(
      async (value: number) => {
        this.prixMoyen = value;
      },
      async (err) => {
        
      }
    );
  }

  setPrixMoyen() {
    this.trajetAnnonce.prix = parseInt(this.prixMoyen.toString());
  }

  SelectSearchResultModel(item) {
    this.newVehicule.modele = item;
    this.autoCompleteModels = [];
  }

  UpdateSearchResultsModels() {
    this.autoCompleteModels = [];

    if (this.newVehicule.modele.length < 1) {
      return;
    }

    let PATTERN = this.newVehicule.modele.toUpperCase();
    this.autoCompleteModels = this.carModels.filter(function (str) { return str.toUpperCase().indexOf(PATTERN) > -1; });
  }

  SelectSearchResultMarque(item) {
    this.newVehicule.marque = item.brand;
    this.autoCompleteMarques = [];
    this.carModels = item.models;
  }

  UpdateSearchResultsMarques() {
    this.autoCompleteMarques = [];

    if (this.newVehicule.marque.length < 2) {
      return;
    }

    this.vehiculeService.getMarques(this.newVehicule.marque).subscribe(
      async (res) => {
        this.autoCompleteMarques = res;
        if (this.autoCompleteMarques.length == 1)
          this.carModels = this.autoCompleteMarques[0].models;
      }
    );
  }
    
  validationTrajet(){
    return (this.trajetAnnonce.depart != null && this.trajetAnnonce.depart != "") &&
      (this.trajetAnnonce.destination != null && this.trajetAnnonce.destination != "");
  }

  @ViewChild(NgForm, { static: false }) vehiculeForm: NgForm;

  validationVehicule(){
    if (this.vehiculeSelect)
      return true;
    else{
      return this.vehiculeForm?.valid;
    }
  }
  
  async publierAnnonce(){

    this.trajetAnnonce.dateHeureDepart = new Date(this.trajetAnnonce.dateHeureDepartStr + "Z");
    this.trajetAnnonce.voyageAvec = parseInt(this.trajetAnnonce.voyageAvecStr);

    if (!this.vehiculeSelect) {
      await this.vehiculeService.post(this.newVehicule).subscribe(
        async (resV: Vehicule) => {
          this.vehiculeSelect = resV;
          this.trajetAnnonce.VehiculeId = this.vehiculeSelect.id;
          this.postTrajetAnnonce();
        },
        async (err) => {
          this.blassaAlert.alert("Erreur lors de l'enregistrement du véhicule", err.error);
        }
      );
    }
    else {
      this.postTrajetAnnonce();
    }    
  }

  async postTrajetAnnonce() {
    this.annonceService.post(this.trajetAnnonce).subscribe(
      async (value: TrajetAnnonce) => {
        this.idTrajetAnnonce = await value.id;
        this.blassaAlert.alertDismiss("Enregistrement de votre trajet",
          "Votre trajet a été enregistrée avec succès",
          this.publierAnnonceSuccess.bind(this));
      },
      async (err) => {
        this.blassaAlert.alert("Erreur lors de l'enregistrement de votre trajet", err.error);
      }
    );
  }

  publierAnnonceSuccess(data) {
    this.storage.set('idTrajetAnnonce', this.idTrajetAnnonce);
    this.router.navigate(['/fiche-trajet/' + this.idTrajetAnnonce]);
  }

  changeBagageLourd() {
    if (this.trajetAnnonce.lourd) {
      this.trajetAnnonce.moyen = true;
      this.trajetAnnonce.leger = true;
    }
  }

  changeBagageMoyen() {
    if (this.trajetAnnonce.moyen) {
      this.trajetAnnonce.leger = true;
    }
    else {
      this.trajetAnnonce.lourd = false;
    }
  }

  changeBagageLeger() {
    if (!this.trajetAnnonce.leger) {
      this.trajetAnnonce.moyen = false;
      this.trajetAnnonce.lourd = false;
    }
  }

}

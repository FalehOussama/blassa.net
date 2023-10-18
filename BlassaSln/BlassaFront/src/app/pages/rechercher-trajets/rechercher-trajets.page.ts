import { Component, Input, NgZone, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Sim, SimCard } from '@jonz94/capacitor-sim';
import { Geocoder } from 'ionic-native';
import { StorageService } from 'src/app/services/storage.service';
import { TrajetAnnonceCriteresDto } from '../../classes/trajetAnnonceCriteresDto';

@Component({
  selector: 'app-rechercher-trajets',
  templateUrl: './rechercher-trajets.page.html',
  styleUrls: ['./rechercher-trajets.page.scss'],
})

export class RechercherTrajetsPage implements OnInit {
  static lonDep: any;
  static latDep: any;
  static lonDes: any;
  static latDes: any;

  constructor(
    private router: Router,
    public zone: NgZone,
    private storage : StorageService,
    public formBuilder: FormBuilder,
  ) { 
    this.storage.get('user').then(
      async data => {
        this.user = await data;
      }
    )

    this.GoogleAutocompleteDep = new google.maps.places.AutocompleteService();
    this.autocompleteDep = { input: '' };
    this.autocompleteItemsDep = [];

    this.GoogleAutocompleteDes = new google.maps.places.AutocompleteService();
    this.autocompleteDes = { input: '' };
    this.autocompleteItemsDes = [];
  }

  autocompleteDep: { input: string; };
  autocompleteItemsDep: any[];
  GoogleAutocompleteDep: any;

  autocompleteDes: { input: string; };
  autocompleteItemsDes: any[];
  GoogleAutocompleteDes: any;
  
  placeid: any;
  lonDes:any;
  latDes:any;


  //Maj

  today : String = new Date().toISOString();

  user:any;
  recherche: FormGroup;
  listeRecherches:any;

  //Maj

  @Input() depart:any;
  @Input() dest:any;
  //Date:number = Date.now();
  //@Input() date: Date = new Date();
  date: any = new Date().toISOString();
  @Input() passagers: any = 1;

  

  isAlertOpen = false;
  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }


  sliced:any;
  ngOnInit() {
    //this.date = this.today;
    this.recherche = this.formBuilder.group({
      nbrPassager: [this.passagers, ],
      date:[this.date,],
      depart:[this.depart,],
      destination:[this.dest,]
    });

  }

  parseDate(date) {
    const newDate = new Date();      
      newDate.setFullYear(date[0] , date[1] , date[2]);
      return newDate
  }

  convertDate(date){
    if(date[1]>10){
      return date[0] +"-"+ date[1] +"-"+ date[2] +"T"+ date[3] +":"+ date[4] +":00"   
    }else{
      return date[0] +"-0"+ date[1] +"-"+ date[2] +"T"+ date[3] +":"+ date[4] +":00" 
    }
    
  }

  rechercheParHistorique(dep:any , des:any , nbp:any , date:any){
    
    //this.annonceService.rechercher2(dep , des , nbp , this.recherche.value['date'] ).subscribe(
    //  async data=>
    //  {
    //  console.log(data);
    //  await this.storage.set('annonces' , data);
    //  this.listeTrajets();
    //  }
    //)

  }

  rechercher(){
    let trajetAnnonceCriteresDto = new TrajetAnnonceCriteresDto();
    trajetAnnonceCriteresDto.depart = this.depart;
    trajetAnnonceCriteresDto.destination = this.dest;
    trajetAnnonceCriteresDto.nombrePlaces = this.passagers;
    trajetAnnonceCriteresDto.dateDepart = new Date(this.date);

    this.storage.set('trajetAnnonceCriteresDto', trajetAnnonceCriteresDto);

    this.router.navigate(['/home']);
  }



  get errorControl() {
    return this.recherche.controls;
  }



  //Code Champ nombre passager
  plusPa() { if (this.passagers < 8) this.passagers++; }
  minusPa() {if (this.passagers > 0) this.passagers--; }
  //Fin

  //Code Google Maps

  SelectSearchResultDep(item) {
    /////WE CAN CONFIGURE MORE COMPLEX FUNCTIONS SUCH AS UPLOAD DATA TO FIRESTORE OR LINK IT TO SOMETHING
    //// alert(JSON.stringify(item))      
    //this.placeid = item.place_id;
    //this.recherche.value['depart']= item.structured_formatting["main_text"];
    //this.depart = item.description
    //this.autocompleteItemsDep = [];
    //// this.getLatLngFromAddressDep(item.place_id);
    //console.log(RechercherTrajetsPage.lonDep);
}
  

  SelectSearchResultDes(item) {   
    //this.dest=item.description
    //console.log(item)
    //this.placeid = item.place_id;
    //this.recherche.value['destination']= item.structured_formatting["main_text"];
    //this.lonDes = item;
    //this.latDes = item.latitude;
    //this.autocompleteItemsDes = [];
  }


  UpdateSearchResultsDes(){
    //if (this.autocompleteDes.input == '') {
    //  this.autocompleteItemsDes = [];
    //  return;
    //}
    //this.GoogleAutocompleteDes.getPlacePredictions({ input: this.autocompleteDes.input },
    //(predictions, status) => {
    //  this.autocompleteItemsDes = [];
    //  this.zone.run(() => {
    //    predictions.forEach((prediction) => {
    //      this.autocompleteItemsDes.push(prediction);
    //    });
    //  });
    //});
  }

  UpdateSearchResultsDep(){
    //if (this.autocompleteDep.input == '') {
    //  this.autocompleteItemsDep = [];
    //  return;
    //}
    //this.GoogleAutocompleteDep.getPlacePredictions({ input: this.autocompleteDep.input },
    //(predictions, status) => {
    //  this.autocompleteItemsDep = [];
    //  this.zone.run(() => {
    //    predictions.forEach((prediction) => {
    //      this.autocompleteItemsDep.push(prediction);
    //    });
    //  });
    //});
  }
    
  //  getLatLngFromAddressDep(place_Id : any ){

  //   var geocoder = new google.maps.Geocoder();
  
  //   geocoder.geocode( { 'placeId': place_Id}, function(results, status) {
  
  //     if (status == google.maps.GeocoderStatus.OK) {
  //       RechercherTrajetsPage.lonDep =results[0].geometry.location.lng();
  //       RechercherTrajetsPage.latDep =results[0].geometry.location.lat();
  
  //     } else {
  //       console.log("Geocode was not successful for the following reason: " + status);
  //     }
  //   });

  // }
}
